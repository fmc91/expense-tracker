using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace ExpensesData
{
    public class ExpensesContextFactory : IDesignTimeDbContextFactory<ExpensesContext>
    {
        public ExpensesContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ExpensesContext>()
                .UseSqlite(@"Data Source=C:\Users\fazal\source\repos\ExpenseTracker\ExpensesData\expenses.db");

            return new ExpensesContext(optionsBuilder.Options);
        }
    }
}
