namespace TodoApp.API.Config
{
    public class MongoDbSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string UserCollection { get; set; } = null!;
        public string? JwtSecret { get; set; }
        
         public string TodoCollection { get; set; } = null!;
    }
}