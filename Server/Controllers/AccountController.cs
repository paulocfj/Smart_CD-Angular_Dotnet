using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Server.Db;
using Microsoft.EntityFrameworkCore;
using Server.DTOs;
using Server.Models;
using System;
using BC = BCrypt.Net.BCrypt;
using Server.ViewModel;
using Server.Services;
using Microsoft.AspNetCore.Authorization;

namespace Server.Controllers 
{
    [ApiController]
    [Route("/api/account")]
    public class AccountController  : ControllerBase
    {
        private readonly DataContext _context;  

        public AccountController(DataContext DataContext)
        {
            _context = DataContext;
        }


        [HttpPost]
        public async Task<IActionResult> Create(User user)
        {
            try
            {
                var existUser = await _context.Users.FirstOrDefaultAsync(x => x.Username == user.Username);

                if(existUser != null)
                {
                    return BadRequest(new JsonResponse{message = "Usuário não pode ser criado, pois o nome do usuário já existe!"});
                }

                user.Password = BC.HashPassword(user.Password);
                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                return BadRequest(new JsonResponse{message = ex.Message});
            }
            
            return Ok(user);
        }

        [HttpPut]
        public async Task<IActionResult> Update(User user)
        {
            var existUser = await _context.Users.FirstOrDefaultAsync(x => x.Id == user.Id);
            try
            {   
                var UserNameValidate = await _context.Users.FirstOrDefaultAsync(x => x.Username == existUser.Username && x.Id != existUser.Id);

                if(UserNameValidate != null)
                {
                    return BadRequest(new JsonResponse{message = "Usuário não pode ser alterado, pois o nome do usuário já existe!"});
                }

                if(existUser != null)
                {
                    existUser.Name = user.Name;
                    existUser.Password = BC.HashPassword(user.Password);
                    existUser.Username = user.Username;


                   _context.Users.Update(existUser);
                   await _context.SaveChangesAsync();
                }
            }
            catch(Exception ex) 
            {
                return BadRequest(new JsonResponse{message = ex.Message});
            }
            return Ok(existUser);
        }
        
        [HttpDelete("{UserId}")]
        public async Task<IActionResult> Delete(int UserId)        
        {
            var existUser = await _context.Users.FirstOrDefaultAsync(x => x.Id == UserId);
            try
            {
                if(existUser != null)
                {
                   _context.Users.Remove(existUser);
                   await _context.SaveChangesAsync();
                }
            }
            catch(Exception ex) 
            {
                return BadRequest(new JsonResponse{message = ex.Message});
            }
            return NoContent();
        }

        [HttpPost, Route("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginViewModel login)
        {
            var User = await _context.Users.SingleOrDefaultAsync(x => x.Username == login.Username);

            if( User == null || !BC.Verify(login.Password, User.Password))
            {
                return BadRequest(new JsonResponse{message = "Usuário ou senha inválidos!" });
            }
            
            var Token = TokenService.GenerateToken(User);

            return Ok(new TokenViewModel{Token=Token});
        }


    }
}