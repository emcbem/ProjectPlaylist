using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.Services.UserServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlaylistApp.Test.Services;

public class TestUserService
{
	[Fact]
	public void CanConstructUserService()
	{
		var factory = new Moq.Mock<IDbContextFactory<PlaylistDbContext>>();

		var userService = new UserService(factory.Object);

		Assert.True(true);
	}
}
