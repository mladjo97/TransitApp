using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Web.Http.Dependencies;
using Unity;
using Unity.Lifetime;
using WebApp.Persistence;
using WebApp.Persistence.Repository.BusLineRepository;
using WebApp.Persistence.Repository.TicketRepository;
using WebApp.Persistence.Repository.UserRepository;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.App_Start
{
    public class UnityResolver : IDependencyResolver
    {
        protected IUnityContainer container;

        public UnityResolver(IUnityContainer container)
        {
            if (container == null)
            {
                throw new ArgumentNullException("container");
            }
            this.container = container;
        }

        public object GetService(Type serviceType)
        {
            try
            {
                return container.Resolve(serviceType);
            }
            catch (ResolutionFailedException)
            {
                return null;
            }
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            try
            {
                return container.ResolveAll(serviceType);
            }
            catch (ResolutionFailedException)
            {
                return new List<object>();
            }
        }

        public IDependencyScope BeginScope()
        {
            var child = container.CreateChildContainer();
            return new UnityResolver(child);
        }

        public void RegisterTypes()
        {
            // NOTE: To load from web.config uncomment the line below.
            // Make sure to add a Unity.Configuration to the using statements.
            // container.LoadConfiguration();

            // TODO: Register your type's mappings here.
            container.RegisterType<IUserRepository, UserRepository>();
            container.RegisterType<IBusLineRepository, BusLineRepository>();
            container.RegisterType<IStationRepository, StationRepository>();
            container.RegisterType<IBusLineStationsRepository, BusLineStationsRepository>();
            container.RegisterType<IBusLineTypeRepository, BusLineTypeRepository>();
            container.RegisterType<IStartTimeRepository, StartTimeRepository>();
            container.RegisterType<IUserTypeRepository, UserTypeRepository>();
            
            container.RegisterType<ITicketRepository, TicketRepository>();
            container.RegisterType<ITicketTypeRepository, TicketTypeRepository>();
            container.RegisterType<IPriceListRepository, PriceListRepository>();
            container.RegisterType<IPriceListItemRepository, PriceListItemRepository>();
            container.RegisterType<IUserTypeDiscountRepository, UserTypeDiscountRepository>();


            container.RegisterType<DbContext, ApplicationDbContext>(new PerResolveLifetimeManager());
            container.RegisterType<IUnitOfWork, UnitOfWork>();
        }

        public void Dispose()
        {
            Dispose(true);
        }

        protected virtual void Dispose(bool disposing)
        {
            container.Dispose();
        }
    }
}