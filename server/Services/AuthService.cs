using MongoDB.Driver;
using TodoApp.API.Models;
using TodoApp.API.Helpers;
using Microsoft.Extensions.Options;
using TodoApp.API.Config;
using TodoApp.API.Dto;

namespace TodoApp.API.Services
{
    public class AuthService
    {
        private readonly IMongoCollection<User> _users;
        private readonly string _jwtSecret;

        public AuthService(IOptions<MongoDbSettings> mongoSettings, IOptions<JwtSettings> jwtSettings)
        {
            var client = new MongoClient(mongoSettings.Value.ConnectionString);
            var db = client.GetDatabase(mongoSettings.Value.DatabaseName);
            _users = db.GetCollection<User>(mongoSettings.Value.UserCollection);

            _jwtSecret = jwtSettings.Value.Secret ?? throw new ArgumentNullException("JWT secret is missing");

            if (_jwtSecret.Length < 16)
                throw new Exception("JWT secret must be at least 128 bits (16 characters) long.");
        }

        public async Task<AuthResult?> Register(string username, string email, string password)
        {
            var normalizedEmail = email.Trim().ToLower();
            var existing = await _users.Find(u => u.Email == normalizedEmail).FirstOrDefaultAsync();
            if (existing != null) return null;

            var user = new User
            {
                Username = username,
                Email = normalizedEmail,
                PasswordHash = PasswordHelper.HashPassword(password),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow};

            await _users.InsertOneAsync(user);

            var token = JwtHelper.GenerateJwt(user, _jwtSecret);

            return new AuthResult
            {
                Token = token,
                UserId = user.Id!,
                Username = user.Username,
                Email = user.Email
            };
        }

        public async Task<string?> Login(string email, string password)
        {
            var normalizedEmail = email.Trim().ToLower();
            var user = await _users.Find(u => u.Email == normalizedEmail).FirstOrDefaultAsync();
            if (user == null || !PasswordHelper.VerifyPassword(password, user.PasswordHash))
                return null;

            return JwtHelper.GenerateJwt(user, _jwtSecret);
        }

        public async Task<User?> GetUserById(string id)
        {
            return await _users.Find(u => u.Id == id).FirstOrDefaultAsync();
        }
    }
}
