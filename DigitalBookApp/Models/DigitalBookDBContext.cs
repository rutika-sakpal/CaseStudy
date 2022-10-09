using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace DigitalBookApp.Models
{
    public partial class DigitalBookDBContext : DbContext
    {
        public DigitalBookDBContext()
        {
        }

        public DigitalBookDBContext(DbContextOptions<DigitalBookDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<OrderBook> OrderBooks { get; set; }
        public virtual DbSet<Refund> Refunds { get; set; }
        public virtual DbSet<TblAuthor> TblAuthors { get; set; }
        public virtual DbSet<TblAuthorBook> TblAuthorBooks { get; set; }
        public virtual DbSet<TblLogin> TblLogins { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=CTSDOTNET845;Initial Catalog=DigitalBookDB;User ID=sa;Password=pass@word1");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<OrderBook>(entity =>
            {
                entity.HasKey(e => e.OrderId);

                entity.ToTable("OrderBook");

                entity.Property(e => e.Address).HasMaxLength(50);

                entity.Property(e => e.CardHolderName).HasMaxLength(50);

                entity.Property(e => e.CardNumber).HasMaxLength(50);

                entity.Property(e => e.Cvv).HasMaxLength(50);

                entity.Property(e => e.IsOrderActive).HasMaxLength(50);

                entity.Property(e => e.PaymentMethod).HasMaxLength(100);
            });

            modelBuilder.Entity<Refund>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Refund");
            });

            modelBuilder.Entity<TblAuthor>(entity =>
            {
                entity.HasKey(e => e.AuthorId);

                entity.ToTable("tblAuthor");

                entity.Property(e => e.AuthorCode).HasMaxLength(50);

                entity.Property(e => e.AuthorEmail).HasMaxLength(50);

                entity.Property(e => e.AuthorName).HasMaxLength(50);

                entity.Property(e => e.CreatedBy).HasMaxLength(50);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.ModifiedBy).HasMaxLength(50);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<TblAuthorBook>(entity =>
            {
                entity.HasKey(e => e.AuthorBookId);

                entity.ToTable("tblAuthorBook");

                entity.Property(e => e.BookContent).HasMaxLength(200);

                entity.Property(e => e.Category).HasMaxLength(50);

                entity.Property(e => e.CreatedBy).HasMaxLength(50);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Image).HasMaxLength(500);

                entity.Property(e => e.IsActive).HasMaxLength(50);

                entity.Property(e => e.IsDeleted).HasMaxLength(50);

                entity.Property(e => e.ModifiedBy).HasMaxLength(50);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Publisher).HasMaxLength(50);

                entity.Property(e => e.Title).HasMaxLength(50);
            });

            modelBuilder.Entity<TblLogin>(entity =>
            {
                entity.ToTable("tblLogin");

                entity.Property(e => e.CreatedBy).HasMaxLength(50);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.FullName).HasMaxLength(50);

                entity.Property(e => e.ModifiedBy).HasMaxLength(50);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Password).HasMaxLength(50);

                entity.Property(e => e.RoleCategory).HasMaxLength(50);

                entity.Property(e => e.UserName).HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
