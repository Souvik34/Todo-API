using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TodoApp.API.Models;

public class Todo
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string UserId { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public bool IsCompleted { get; set; } = false;

    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
