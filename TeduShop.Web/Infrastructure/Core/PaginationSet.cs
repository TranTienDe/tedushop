using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TeduShop.Web.Infrastructure.Core
{
    public class PaginationSet<T>
    {
        public int Page { get; set; }
        public int Count
        {
            get
            {
                return (Items != null) ? Items.Count() : 0;
            }
        }
        public int TotalPage { get; set; } //Lưu số trang
        public int TotalCount { get; set; } //Tổng số bản ghi
        public IEnumerable<T> Items { get; set; }
    }
}