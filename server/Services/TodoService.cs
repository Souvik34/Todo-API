using MongoDB.Driver;
using TodoApp.API.Models;
using Microsoft.Extensions.Options;
using TodoApp.API.Config;

namespace TodoApp.API.Services;

public class TodoService
{
    private readonly IMongoCollection<Todo> _todos;

    public TodoService(IOptions<MongoDbSettings> settings)
    {
        var client = new MongoClient(settings.Value.ConnectionString);
        var db = client.GetDatabase(settings.Value.DatabaseName);
        _todos = db.GetCollection<Todo>(settings.Value.TodoCollection);
    }

    public async Task<List<Todo>> GetTodosByUser(string userId) =>
        await _todos.Find(t => t.UserId == userId).ToListAsync();

    public async Task<Todo> AddTodo(Todo todo)
    {
        await _todos.InsertOneAsync(todo);
        return todo;
    }

    public async Task<bool> DeleteTodo(string id)
    {
        var result = await _todos.DeleteOneAsync(t => t.Id == id);
        return result.DeletedCount > 0;
    }

    public async Task<bool> ToggleComplete(string id)
    {
        var todo = await _todos.Find(t => t.Id == id).FirstOrDefaultAsync();
        if (todo == null) return false;

        todo.IsCompleted = !todo.IsCompleted;
        await _todos.ReplaceOneAsync(t => t.Id == id, todo);
        return true;
    }

   public async Task<bool> UpdateTodo(string id, string title, string description, bool isCompleted)
{
    var filter = Builders<Todo>.Filter.Eq(t => t.Id, id);
    var update = Builders<Todo>.Update
        .Set(t => t.Title, title)
        .Set(t => t.Description, description)
        .Set(t => t.IsCompleted, isCompleted)
        .Set(t => t.UpdatedAt, DateTime.UtcNow); // Optional if you're tracking updates

    var result = await _todos.UpdateOneAsync(filter, update);
    return result.ModifiedCount > 0;
}


}


