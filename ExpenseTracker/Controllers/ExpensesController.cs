using System.Linq;
using ExpensesData;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Controllers
{
    [Route("api/expenses")]
    [ApiController]
    public class ExpensesController : ControllerBase
    {
        private readonly ExpensesContext _db;

        public ExpensesController(ExpensesContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<List<Expense>> GetAsync()
        {
            return await _db.Expense.ToListAsync();
        }

        [Route("{id:int}")]
        [HttpGet]
        public async Task<ActionResult<Expense>> GetAsync(int id)
        {
            var result = await _db.Expense.FindAsync(id);

            if (result == null)
                return NotFound();

            return result;
        }

        [HttpPost]
        public async Task<ActionResult> PostAsync([FromBody] Expense item)
        {
            if (item.ExpenseId != 0)
                return BadRequest();

            _db.Expense.Add(item);

            await _db.SaveChangesAsync();

            return CreatedAtAction("Post", new { id = item.ExpenseId }, item);
        }

        [HttpPut]
        public async Task<ActionResult> PutAsync([FromBody] Expense item)
        {
            if (!_db.Expense.Any(e => e.ExpenseId == item.ExpenseId))
                return NotFound();

            _db.Expense.Update(item);

            await _db.SaveChangesAsync();

            return NoContent();
        }

        [Route("{id:int}")]
        [HttpDelete]
        public async Task<ActionResult> DeleteAsync(int id)
        {
            var expense = await _db.Expense.FindAsync(id);

            if (expense == null)
                return NotFound();

            _db.Expense.Remove(expense);

            await _db.SaveChangesAsync();

            return NoContent();
        }
    }
}
