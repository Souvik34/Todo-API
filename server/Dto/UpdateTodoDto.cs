namespace TodoApp.API.Dtos;

public class UpdateTodoDto
{
    public string Title { get; set; } = string.Empty;
    public bool IsCompleted { get; set; }
}
