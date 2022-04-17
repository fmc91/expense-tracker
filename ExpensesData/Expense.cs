using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpensesData
{
    public class Expense
    {
        public int ExpenseId { get; set; }

        public string Description { get; set; }

        public string Recipient { get; set; }

        public DateTime Date { get; set; }

        public decimal Amount { get; set; }
    }
}
