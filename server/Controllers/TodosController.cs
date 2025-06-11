using Microsoft.AspNetCore.Mvc;
using TodoApp.API.Services;
using TodoApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using TodoApp.API.Dtos;
namespace TodoApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]  // Require authorization for all endpoints
public class TodosController : ControllerBase
{
    private readonly TodoService _todoService;

    public TodosController(TodoService todoService)
    {
        _todoService = todoService;
    }

    private string? GetUserId() =>
        User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;

    [HttpGet]
    public async Task<IActionResult> GetTodos()
    {
        var userId = GetUserId();
        if (userId == null) return Unauthorized(new { message = "User not authenticated" });

        var todos = await _todoService.GetTodosByUser(userId);
        return Ok(todos);
    }

    [HttpPost("create-todo")]
    public async Task<IActionResult> AddTodo([FromBody] Todo todo)
    {
        var userId = GetUserId();
        if (userId == null) return Unauthorized(new { message = "User not authenticated" });

        if (string.IsNullOrWhiteSpace(todo.Title))
            return BadRequest(new { message = "Todo title is required" });

        todo.UserId = userId;
        todo.IsCompleted = false; // Default to false on creation

        var result = await _todoService.AddTodo(todo);
        return Ok(new { message = "Todo created successfully", todo = result });
    }

    [HttpPut("{id}/toggle")]
    public async Task<IActionResult> ToggleComplete(string id)
    {
        var success = await _todoService.ToggleComplete(id);
        if (!success) return NotFound(new { message = "Todo not found" });

        var updatedTodo = await _todoService.GetTodosByUser(GetUserId() ?? "")
                                    .ContinueWith(t => t.Result.Find(t => t.Id == id));

        return Ok(new { message = "Todo status toggled", todo = updatedTodo });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var success = await _todoService.DeleteTodo(id);
        return success
            ? Ok(new { message = "Todo deleted successfully" })
            : NotFound(new { message = "Todo not found" });
    }

 
[HttpPut("{id}")]
public async Task<IActionResult> UpdateTodo(string id, [FromBody] UpdateTodoDto dto)
{
    var userId = GetUserId();
    if (userId == null) return Unauthorized(new { message = "User not authenticated" });

    if (string.IsNullOrWhiteSpace(dto.Title))
        return BadRequest(new { message = "Title cannot be empty" });

    var success = await _todoService.UpdateTodo(id, dto.Title, dto.Description, dto.IsCompleted);
    if (!success) return NotFound(new { message = "Todo not found or update failed" });

    return Ok(new { message = "Todo updated successfully" });
}

}
