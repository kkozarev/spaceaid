using SpaceAidAppModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SpaceAidAppData
{
    public interface IUowData
    {
        GenericRepository<UserProfile> UserProfiles { get; }
        
        int SaveChanges();
    }
}
