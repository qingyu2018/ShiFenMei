using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ShiFenMei.Startup))]
namespace ShiFenMei
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
