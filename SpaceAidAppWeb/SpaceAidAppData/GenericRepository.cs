﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace SpaceAidAppData
{
    public class GenericRepository<T> : IRepository<T> where T : class
    {
        public GenericRepository()
            : this(new ApplicationDbContext())
        {
        }

        public GenericRepository(DbContext context)
        {
            if (context == null)
            {
                throw new ArgumentException("An instance of DbContext is required to use this repository.", "context");
            }

            this.Context = context;
            this.DbSet = this.Context.Set<T>();
        }

        protected IDbSet<T> DbSet { get; set; }

        protected DbContext Context { get; set; }

        public virtual IQueryable<T> All()
        {
            var all = this.DbSet.AsQueryable();
            return all;
        }

        public virtual IQueryable<T> All(string[] includes)
        {
            var data = this.DbSet.AsQueryable();
            for (int i = 0; i < includes.Length; i++)
            {
                data = data.Include(includes[i]);
            }
            return data;
        }

        public virtual T GetById(int id)
        {
            return this.DbSet.Find(id);
        }

        public virtual T GetById(string id)
        {
            return this.DbSet.Find(id);
        }

        public virtual void Add(T entity)
        {
            DbEntityEntry entry = this.Context.Entry(entity);
            this.DbSet.Add(entity);
        }

        public virtual void Update(T entity)
        {
            DbEntityEntry entry = this.Context.Entry(entity);
            this.DbSet.Attach(entity);

        }

        public virtual void Delete(T entity)
        {
            DbEntityEntry entry = this.Context.Entry(entity);
            this.DbSet.Attach(entity);
            this.DbSet.Remove(entity);
        }

        public virtual void Delete(int id)
        {
            var entity = this.GetById(id);

            if (entity != null)
            {
                this.Delete(entity);
            }
        }

        //public virtual void Detach(T entity)
        //{
        //    DbEntityEntry entry = this.Context.Entry(entity);

        //    entry.State = EntityState.Detached;
        //}
    }
}
