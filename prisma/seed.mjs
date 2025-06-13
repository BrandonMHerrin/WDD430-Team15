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
  const categories = await prisma.category.findMany({
    include: {
      children: true,
      parent: true,
    }
  });
  console.log('Categories: ', categories);

  // // Seed products
  // await seedProducts();

  console.log('Seeding completed successfully!');

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
    // {
    //   name: "Jewelry",
    //   description: "Handcrafted jewelry pieces",
    //   // localImagePath: path.join(process.cwd(), "public", "images", "jewelry.jpg"),
    //   isActive: true,
    //   sortOrder: 1,
    // },
    // {
    //   name: "Necklaces",
    //   description: "Handcrafted necklaces",
    //   isActive: true,
    //   sortOrder: 1,
    //   parentCategoryId: 1
    // },
    // {
    //   name: "Earrings",
    //   description: "Handcrafted earrings",
    //   isActive: true,
    //   sortOrder: 2,
    //   parentCategoryId: 1
    // },
    // {
    //   name: "Bracelets",
    //   description: "Handcrafted bracelets",
    //   isActive: true,
    //   sortOrder: 3,
    //   parentCategoryId: 1
    // },
    // {
    //   name: "Rings",
    //   description: "Handcrafted rings",
    //   isActive: true,
    //   sortOrder: 4,
    //   parentCategoryId: 1
    // },
    // {
    //   name: "Home & Living",
    //   description: "Handmade home decor and furniture",
    //   isActive: true,
    //   sortOrder: 2,
    //   // subcategories: [
    //   //   "Home Decor",
    //   //   "Kitchen & Dining",
    //   //   "Furniture",
    //   //   "Lighting",
    //   // ],
    // },
    // {
    //   name: 'Home Decor',
    //   description: 'Handmade home decor items',
    //   isActive: true,
    //   sortOrder: 1,
    //   parentCategoryId: 6,
    // },
    // {
    //   name: 'Kitchen & Dining',
    //   description: 'Handmade kitchen and dining items',
    //   isActive: true,
    //   sortOrder: 2,
    //   parentCategoryId: 6,
    // },
    // {
    //   name: 'Furniture',
    //   description: 'Handmade furniture pieces',
    //   isActive: true,
    //   sortOrder: 3,
    //   parentCategoryId: 6,
    // },
    // {
    //   name: 'Lighting',
    //   description: 'Handmade lighting solutions',
    //   isActive: true,
    //   sortOrder: 4,
    //   parentCategoryId: 6,
    // },
    // {
    //   name: "Clothing",
    //   description: "Handmade clothing and accessories",
    //   isActive: true,
    //   sortOrder: 3,
    //   // subcategories: ["Women's", "Men's", "Kids'", "Accessories"],
    // },
    // {
    //   name: 'Women\'s',
    //   description: 'Handmade women\'s clothing',
    //   isActive: true,
    //   sortOrder: 1,
    //   parentCategoryId: 11,
    // },
    // {
    //   name: 'Men\'s',
    //   description: 'Handmade men\'s clothing',
    //   isActive: true,
    //   sortOrder: 2,
    //   parentCategoryId: 11,
    // },
    // {
    //   name: 'Kids\'',
    //   description: 'Handmade kids\' clothing',
    //   isActive: true,
    //   sortOrder: 3,
    //   parentCategoryId: 11,
    // },
    // {
    //   name: 'Accessories',
    //   description: 'Handmade clothing accessories',
    //   isActive: true,
    //   sortOrder: 4,
    //   parentCategoryId: 11,
    // },
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
    ownerId: 3, // Assuming you have a user with ID 3
  };

  await prisma.store.create({
    data: store,
  });
  console.log('Store seeded successfully.');
}


main()
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });