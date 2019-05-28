using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Unity;

namespace WebApp.App_Start
{
    public class SignalRUnityDependencyResolver : DefaultDependencyResolver
    {
        private IUnityContainer _container;
        public SignalRUnityDependencyResolver(IUnityContainer container)
        {
            _container = container;
        }

        public override object GetService(Type serviceType)
        {
            if (_container.IsRegistered(serviceType)) return _container.Resolve(serviceType);
            else return base.GetService(serviceType);
        }

        public override IEnumerable<object> GetServices(Type serviceType)
        {
            if (_container.IsRegistered(serviceType)) return _container.ResolveAll(serviceType);
            else return base.GetServices(serviceType);
        }
    }
}