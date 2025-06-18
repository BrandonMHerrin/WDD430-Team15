import { PrismaClient } from '@prisma/client';
import { put } from '@vercel/blob';
import { readFile } from 'fs/promises';
import { randomUUID } from 'crypto';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  // Seed store
  // await seedStore();
  // const stores = await prisma.store.findMany();
  // console.log('Stores:', stores);

  // Seed categories
  // await seedCategories();
  // const categories = await prisma.category.findMany({
  //   include: {
  //     children: true,
  //     parent: true,
  //   }
  // });
  // console.log('Categories: ', categories);

  // // Seed products
  // await seedProducts();
  const products = await prisma.product.findMany({include: {
    productImages: true,
  }});
  console.log('Products: ', products);

  console.log('Seeding completed successfully!');

}

function getAssetsPath(relativePath) {
  return path.join(process.cwd(), '/public/', relativePath);
}

async function getUsers() {
  return await prisma.user.findMany();
}

async function uploadImage(localPath) {
  try {
    const fileBuffer = await readFile(localPath);
    const ext = path.extname(localPath);
    const uniqueFileName = `${randomUUID()}${ext}`;
    
    const blob = await put(uniqueFileName, fileBuffer, {
      access: 'public',
    });

    return blob.url;
  } catch (error) {
    console.error(`Error uploading image ${localPath}:`, error);
    throw error;
  }
}

async function seedCategories() {
  const categoriesData = [
    {
      name: "Jewelry",
      description: "Handcrafted jewelry pieces",
      // localImagePath: path.join(process.cwd(), "public", "images", "jewelry.jpg"),
      isActive: true,
      sortOrder: 1,
    },
    {
      name: "Necklaces",
      description: "Handcrafted necklaces",
      isActive: true,
      sortOrder: 1,
      parentCategoryId: 1
    },
    {
      name: "Earrings",
      description: "Handcrafted earrings",
      isActive: true,
      sortOrder: 2,
      parentCategoryId: 1
    },
    {
      name: "Bracelets",
      description: "Handcrafted bracelets",
      isActive: true,
      sortOrder: 3,
      parentCategoryId: 1
    },
    {
      name: "Rings",
      description: "Handcrafted rings",
      isActive: true,
      sortOrder: 4,
      parentCategoryId: 1
    },
    {
      name: "Home & Living",
      description: "Handmade home decor and furniture",
      isActive: true,
      sortOrder: 2,
      // subcategories: [
      //   "Home Decor",
      //   "Kitchen & Dining",
      //   "Furniture",
      //   "Lighting",
      // ],
    },
    {
      name: 'Home Decor',
      description: 'Handmade home decor items',
      isActive: true,
      sortOrder: 1,
      parentCategoryId: 6,
    },
    {
      name: 'Kitchen & Dining',
      description: 'Handmade kitchen and dining items',
      isActive: true,
      sortOrder: 2,
      parentCategoryId: 6,
    },
    {
      name: 'Furniture',
      description: 'Handmade furniture pieces',
      isActive: true,
      sortOrder: 3,
      parentCategoryId: 6,
    },
    {
      name: 'Lighting',
      description: 'Handmade lighting solutions',
      isActive: true,
      sortOrder: 4,
      parentCategoryId: 6,
    },
    {
      name: "Clothing",
      description: "Handmade clothing and accessories",
      isActive: true,
      sortOrder: 3,
      // subcategories: ["Women's", "Men's", "Kids'", "Accessories"],
    },
    {
      name: 'Women\'s',
      description: 'Handmade women\'s clothing',
      isActive: true,
      sortOrder: 1,
      parentCategoryId: 11,
    },
    {
      name: 'Men\'s',
      description: 'Handmade men\'s clothing',
      isActive: true,
      sortOrder: 2,
      parentCategoryId: 11,
    },
    {
      name: 'Kids\'',
      description: 'Handmade kids\' clothing',
      isActive: true,
      sortOrder: 3,
      parentCategoryId: 11,
    },
    {
      name: 'Accessories',
      description: 'Handmade clothing accessories',
      isActive: true,
      sortOrder: 4,
      parentCategoryId: 11,
    },
    {
      name: "Art & Collectibles",
      description: "Unique art pieces and collectibles",
      isActive: true,
      sortOrder: 4,
    },
    {
      name: "Craft Supplies",
      description: "Materials for your creative projects",
      isActive: true,
      sortOrder: 5,
    },
    {
      name: "Gifts",
      description: "Perfect handmade gifts for any occasion",
      isActive: true,
      sortOrder: 6,
    },
  ];

  // Upload images and create categories
  for (const category of categoriesData) {
    const { localImagePath, ...categoryData } = category;
    
    // Only upload if there's an image path
    const imageUrl = localImagePath ? await uploadImage(localImagePath) : null;

    await prisma.category.create({
      data: {
        ...categoryData,
        imageUrl,
      },
    });

    console.log(`Category ${category.name} created with image: ${imageUrl}`);
  }
}

async function seedStore() {
  console.log('Seeding store...');
  // Define the store data
  const store = {
    name: "Test Store",
    description: "This is a test store for seeding purposes.",
    ownerId: 2, // Assuming you have a user with ID 3
  };

  await prisma.store.create({
    data: store,
  });
  console.log('Store seeded successfully.');
}

async function seedProducts() {
  console.log('Seeding products...');
  
  const products = [
    {
      name: "Handwoven Ceramic Vase",
      description:
        "A beautiful handwoven ceramic vase, perfect for home decor.",
      localImagePath: "/images/placeholder-product.jpg",
      storeId: 2, // Assuming you have a store with ID 1
      categoryId: 1, // Assuming you have a category with ID 1
      price: 89.99,
    },
    {
      name: "Sterling Silver Necklace",
      description:
        "A stunning sterling silver necklace with intricate designs.",
      localImagePath: "/images/placeholder-product.jpg",
      storeId: 2, // Assuming you have a store with ID 1
      categoryId: 1, // Assuming you have a category with ID 1
      price: 129.5,
    },
    {
      name: "Organic Cotton Scarf",
      description:
        "A soft and warm organic cotton scarf, perfect for chilly days.",
      localImagePath: "/images/placeholder-product.jpg",
      storeId: 2, // Assuming you have a store with ID 1
      categoryId: 1, // Assuming you have a category with ID 1
      price: 45.0,
    },
    {
      name: "Wooden Cutting Board Set",
      description:
        "A set of handcrafted wooden cutting boards, ideal for any kitchen.",
      localImagePath: "/images/placeholder-product.jpg",
      storeId: 2, // Assuming you have a store with ID 1
      categoryId: 1, // Assuming you have a category with ID 1
      price: 67.99,
    },
    {
      name: "Hand-knitted Wool Sweater",
      description:
        "A cozy hand-knitted wool sweater, perfect for the winter season.",
      localImagePath: "/images/placeholder-product.jpg",
      storeId: 2, // Assuming you have a store with ID 1
      categoryId: 1, // Assuming you have a category with ID 1
      price: 95.0,
    },
  ];

  for (const product of products) {
    // If you have a local image path, upload it
    const result = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        storeId: product.storeId,
        categoryId: product.categoryId,
      },
    });
    if (!result) {
      console.error(`Failed to create product: ${product.name}`);
      continue;
    }
    if (product.localImagePath) {
      product.productImageUrl = await uploadImage(getAssetsPath(product.localImagePath));
      await prisma.productImage.create({
        data: {
          productId: result.id,
          imageUrl: product.productImageUrl,
          sortOrder: 1, // Default sort order
          fileType: path.extname(product.localImagePath).substring(1).toUpperCase(), // Get file type from extension
        },
      });

      console.log(`Uploaded image for product ${product.name}: ${product.productImageUrl}`);
    }
    console.log(`Product ${product.name} created.`);
  }
}


main()
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });