
using SpaceAidAppModels;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Text;
using System.Threading.Tasks;

namespace SpaceAidAppData
{
    public class UowData : IUowData
    {
       
        private readonly DbContext context;
        private readonly Dictionary<Type, object> repositories = new Dictionary<Type, object>();

        public UowData()
            : this(new ApplicationDbContext())
        {
        }

        public UowData(DbContext context)
        {
            this.context = context;
        }

        private GenericRepository<T> GetRepository<T>() where T : class
        {
            if (!this.repositories.ContainsKey(typeof(T)))
            {
                var type = typeof(GenericRepository<T>);

                this.repositories.Add(typeof(T), Activator.CreateInstance(type, this.context));
            }

            return (GenericRepository<T>)this.repositories[typeof(T)];
        }

        public int SaveChanges()
        {
            int result = this.context.SaveChanges();
           
            return result;
        }

        public void Dispose()
        {
            this.context.Dispose();
        }



        public GenericRepository<UserProfile> UserProfiles
        {
            get { return this.GetRepository<UserProfile>(); }
        }

        
        

    }
}
