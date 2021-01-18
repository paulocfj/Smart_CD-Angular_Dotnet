using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Server.Db;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Server.DTOs;
using Server.ViewModel;
using Server.Models;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace Server.Controllers 
{
    [ApiController]
    [Route("/api/cd")]
    public class CDController  : ControllerBase
    {
        private readonly DataContext _context;  

        public CDController(DataContext DataContext)
        {
            _context = DataContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetCDs()
        {
            var CDs  = await _context.CDs.ToListAsync();
            return Ok(CDs);
        }

        
        [HttpGet("{UserId}")]
        public async Task<IActionResult> GetCDsByUser(int UserId)
        {
            var CDs  = await _context.UserCDs.Include(x => x.CD).Where(x => x.UserId == UserId).ToListAsync();
            if(CDs.Count < 1)
            {
                return NotFound(new JsonResponse{message = "Nenhum CD encontrado para este usuário!"} );
            }
            return Ok(CDs);
        }

        [HttpGet("{UserId}/{CdId}")]
        public async Task<IActionResult> GetCDByUser(int UserId, int CdId)
        {
            var CDs  = await _context.UserCDs.Include(x => x.CD).Where(x => x.UserId == UserId && x.CDId == CdId).ToListAsync();
            if(CDs.Count < 1)
            {
                return NotFound(new JsonResponse{message = "Nenhum CD encontrado para este usuário!"} );
            }
            return Ok(CDs);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CDViewModel  cdView)
        {
            #region Insert CD
            var Cd = new CD(cdView);
            try
            {
                await _context.CDs.AddAsync(Cd);
                await _context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                return BadRequest(new JsonResponse{message = ex.Message});
            }
            #endregion
            #region Insert UserCD
            try
            {   
                var User =  await _context.Users.FirstOrDefaultAsync(x => x.Id  == cdView.UserId);
                var UserCd = new UserCD();

                UserCd.UserId = cdView.UserId;
                UserCd.CDId = Cd.Id;
                
                UserCd.User = User;
                UserCd.CD = Cd;

                User.UserCDs = new List<UserCD>();
                User.UserCDs.Add(UserCd);

                Cd.UserCDs = new List<UserCD>();
                Cd.UserCDs.Add(UserCd);

                await _context.UserCDs.AddAsync(UserCd);
                await _context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                return BadRequest(new JsonResponse{message = ex.Message});
            }
            return Ok(cdView);
            #endregion
        }

        [HttpPut]
        public async Task<IActionResult> Update(CDViewModel  cdView)
        {
            #region Update CD
            var CdExist = await _context.CDs.FirstOrDefaultAsync(x => x.Id == cdView.CDId);
            try
            {
                if(CdExist != null)
                {
                    CdExist.Artist = cdView.Artist;
                    CdExist.Duration = cdView.Duration;
                    CdExist.Genre = cdView.Genre;
                    CdExist.Name = cdView.Name;
                    CdExist.Year = cdView.Year;
                }
                 _context.CDs.Update(CdExist);
                await _context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                return BadRequest(new JsonResponse{message = ex.Message});
            }
            #endregion
            return Ok(cdView);
            
        }

        [HttpDelete("{CdId}")]
        public async Task<IActionResult> Delete(int CdId)        
        {
            #region Delete CD
            var existCD = await _context.CDs.FirstOrDefaultAsync(x => x.Id == CdId);
            try
            {
                if(existCD != null)
                {
                   _context.CDs.Remove(existCD);
                   await _context.SaveChangesAsync();
                }
            }
            catch(Exception ex) 
            {
                return BadRequest(new JsonResponse{message = ex.Message});
            }
            return NoContent();
            #endregion
        }

    }
}