namespace TeduShop.Data.Migrations
{
    using Model.Models;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<TeduShop.Data.TeduShopDBContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(TeduShop.Data.TeduShopDBContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.

            CreateProductCategorySample(context);
            CreatePostCategorySample(context);
        }

        private void CreateProductCategorySample(TeduShop.Data.TeduShopDBContext context)
        {
            if (context.ProductCategories.Count() == 0)
            {
                List<ProductCategory> listProductCategory = new List<ProductCategory>()
                {
                    new ProductCategory() { Name = "Điện lạnh", Alias = "dien-lanh", Status = true },
                    new ProductCategory() { Name = "Viễn thông", Alias = "vien-thong", Status = true },
                    new ProductCategory() { Name = "Đồ gia dụng", Alias = "do-gia-dung", Status = true },
                    new ProductCategory() { Name = "Mỹ phẩm", Alias = "my-pham", Status = true },
                };
                context.ProductCategories.AddRange(listProductCategory);
                context.SaveChanges();
            }
        }

        private void CreatePostCategorySample(TeduShop.Data.TeduShopDBContext context)
        {
            if (context.PostCategories.Count() == 0)
            {
                List<PostCategory> listPostCategory = new List<PostCategory>()
                {
                    new PostCategory() { Name = "Tin tức", Alias = "tin-tuc", Status = true },
                    new PostCategory() { Name = "Thề thao", Alias = "the-thao", Status = true },
                    new PostCategory() { Name = "Thời trang", Alias = "thoi-trang", Status = true }                    
                };
                context.PostCategories.AddRange(listPostCategory);
                context.SaveChanges();
            }
        }
    }
}
