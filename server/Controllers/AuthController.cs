using Microsoft.AspNetCore.Mvc;
using TodoApp.API.Services;
using TodoApp.API.Models;

namespace TodoApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] User user)
    {
        var token = await _authService.Register(user.Username, user.Email, user.PasswordHash);
        if (token == null) return BadRequest("User already exists");
        return Ok(new { token });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] User user)
    {
        var token = await _authService.Login(user.Email, user.PasswordHash);
        if (token == null) return Unauthorized("Invalid credentials");
        return Ok(new { token });
    }
}
