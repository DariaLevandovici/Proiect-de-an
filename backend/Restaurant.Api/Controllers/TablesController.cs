using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Restaurant.BusinessLayer.Core.Interfaces;
using Restaurant.Domain.Models.Table;

namespace Restaurant.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TablesController : ControllerBase
{
    private readonly ITableService _tableService;

    public TablesController(ITableService tableService)
    {
        _tableService = tableService;
    }

    [HttpGet]
    [Authorize(Roles = "Admin,Waiter")]
    public async Task<IActionResult> GetAll()
    {
        var tables = await _tableService.GetAllTablesAsync();
        return Ok(tables);
    }

    [HttpGet("{id}")]
    [Authorize(Roles = "Admin,Waiter")]