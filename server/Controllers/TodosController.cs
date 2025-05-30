using Microsoft.AspNetCore.Mvc;
using TodoApp.API.Services;
using TodoApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace TodoApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
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
        if (userId == null) return Unauthorized();

        var todos = await _todoService.GetTodosByUser(userId);
        return Ok(todos);
    }

    [HttpPost]
    public async Task<IActionResult> AddTodo([FromBody] Todo todo)
    {
        var userId = GetUserId();
        if (userId == null) return Unauthorized();

        todo.UserId = userId;
        var result = await _todoService.AddTodo(todo);
        return Ok(result);
    }

    [HttpPut("{id}/toggle")]
    public async Task<IActionResult> ToggleComplete(string id)
    {
        var success = await _todoService.ToggleComplete(id);
        return success ? Ok() : NotFound();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var success = await _todoService.DeleteTodo(id);
        return success ? Ok() : NotFound();
    }
}
