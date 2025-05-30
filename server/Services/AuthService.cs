using MongoDB.Driver;
using TodoApp.API.Models;
using TodoApp.API.Helpers;
using Microsoft.Extensions.Options;
using TodoApp.API.Config;

namespace TodoApp.API.Services;

public class AuthService
{
    private readonly IMongoCollection<User> _users;
    private readonly string _jwtSecret;

    public AuthService(IOptions<MongoDbSettings> settings)
    {
        var client = new MongoClient(settings.Value.ConnectionString);
        var db = client.GetDatabase(settings.Value.DatabaseName);
        _users = db.GetCollection<User>(settings.Value.UserCollection);
        _jwtSecret = Environment.GetEnvironmentVariable("JWT_SECRET") ?? settings.Value.JwtSecret ?? "default_secret";
    }

    public async Task<string?> Register(string username, string email, string password)
    {
        var existing = await _users.Find(u => u.Email == email).FirstOrDefaultAsync();
        if (existing != null) return null;

        var user = new User
        {
            Username = username,
            Email = email,
            PasswordHash = PasswordHelper.HashPassword(password)
        };

        await _users.InsertOneAsync(user);
        return JwtHelper.GenerateJwt(user, _jwtSecret);
    }

    public async Task<string?> Login(string email, string password)
    {
        var user = await _users.Find(u => u.Email == email).FirstOrDefaultAsync();
        if (user == null || !PasswordHelper.VerifyPassword(password, user.PasswordHash))
            return null;

        return JwtHelper.GenerateJwt(user, _jwtSecret);
    }

    public async Task<User?> GetUserById(string id)
    {
        return await _users.Find(u => u.Id == id).FirstOrDefaultAsync();
    }
}
