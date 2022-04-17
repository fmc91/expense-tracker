using System;
using Microsoft.AspNetCore;
using Microsoft.EntityFrameworkCore;
using ExpensesData;

namespace ExpenseTracker
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowOrigin", policy =>
                    policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });

            builder.Services.AddControllers();
            builder.Services.AddDbContext<ExpensesContext>(options =>
                options.UseSqlite(@"Data Source=C:\Users\fazal\source\repos\ExpenseTracker\ExpenseData\expenses.db"));

            var app = builder.Build();

            app.UseCors("AllowOrigin");

            if (!app.Environment.IsDevelopment())
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.MapControllers();

            await SeedDataAsync(app);

            await app.RunAsync();
        }

        private static async Task SeedDataAsync(WebApplication app)
        {
            using var scope = app.Services.CreateScope();

            var db = scope.ServiceProvider.GetRequiredService<ExpensesContext>();

            if (db.Expense.Any()) return;

            db.Expense.AddRange(new[]
            {
                new Expense
                {
                    Recipient = "British Telecom",
                    Date = new DateTime(2021, 10, 24),
                    Description = "Broadband Bill",
                    Amount = 50
                },
                new Expense
                {
                    Recipient = "PC World",
                    Date = new DateTime(2021, 11, 15),
                    Description = "New Computer",
                    Amount = 850
                },
                new Expense
                {
                    Recipient = "nPower",
                    Date = new DateTime(2021, 12, 29),
                    Description = "Electricity Bill",
                    Amount = 350
                },
                new Expense
                {
                    Recipient = "Axis",
                    Date = new DateTime(2022, 1, 7),
                    Description = "Car Rental Fees",
                    Amount = 480
                }
            });

            await db.SaveChangesAsync();
        }
    }
}
