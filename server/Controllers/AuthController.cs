using Microsoft.AspNetCore.Mvc;
using TodoApp.API.Services;
using TodoApp.API.Dto;

namespace TodoApp.API.Controllers
{
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
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var result = await _authService.Register(request.Username, request.Email, request.Password);

            if (result == null)
                return BadRequest("User already exists");

            return Ok(new
            {
                message = "Registration successful",
                user = new
                {
                    userId = result.UserId,
                    username = result.Username,
                    email = result.Email
                },
                token = result.Token // optional: remove if you don't want to return it
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var token = await _authService.Login(request.Email, request.Password);
            if (token == null) return Unauthorized("Invalid credentials");

            return Ok(new { token });
        }
    }
}
