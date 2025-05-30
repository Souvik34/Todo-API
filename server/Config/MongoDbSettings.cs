namespace TodoApp.API.Config;

public class MongoDbSettings
{
    public string ConnectionString { get; set; } = string.Empty;
    public string DatabaseName { get; set; } = string.Empty;
    public string UserCollection { get; set; } = string.Empty;
    public string TodoCollection { get; set; } = string.Empty;
}
