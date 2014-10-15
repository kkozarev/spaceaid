using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SpaceAidAppData
{
    public interface IRepository<T> where T : class
    {
        IQueryable<T> All();

        IQueryable<T> All(string[] include);

        T GetById(int id);

        T GetById(string id);

        void Add(T entity);

        void Update(T entity);

        void Delete(T entity);

        void Delete(int id);

       // void Detach(T entity);
    }
}
