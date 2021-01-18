using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Server.Db;
using Microsoft.EntityFrameworkCore;
using Server.DTOs;
using Server.Models;
using System;
using BC = BCrypt.Net.BCrypt;
using Microsoft.AspNetCore.Authorization;

namespace Server.Controllers 
{
    [ApiController]
    [Route("/api/user")]
    public class UserController  : ControllerBase
    {
        private readonly DataContext _context;  

        public UserController(DataContext DataContext)
        {
            _context = DataContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var Users  = await _context.Users.ToListAsync();
            return Ok(Users);
        }

        
        [HttpGet("{UserId}")]
        public async Task<IActionResult> GetUserById(int UserId)
        {
            var Users  = await  _context.Users.FirstOrDefaultAsync(x => x.Id == UserId);
            if(Users==  null)
            {
                return NotFound(new JsonResponse{message = "Nenhum usuário encotrado!"} );
            }
            return Ok(Users);
        }

    }
}