const Menu = require('../models/menu');
const MenuItem = require('../models/menuItem');

// GET specific menu items
async function getMenuItems(req, res) {
  try {
    const menuId = req.params.menuId;

    const curMenu = await Menu.findById(menuId).populate("items");
    if (!curMenu) {
      return res.status(404).json({ error: 'Menu not found' });
    }

    const msg = {
      menuItems: curMenu.items || [],
      description: curMenu.description,
    };

    return res.status(200).json(msg);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


// POST create menu
async function createMenu(req, res) {
  try {
    const { menu, selecteditems } = req.body.data;

    if (!menu?.name || !Array.isArray(selecteditems)) {
      return res.status(400).json({ error: 'Invalid request format' });
    }

    let existingMenu = await Menu.findOne({ name: menu.name });

  
    const itemDocs = await MenuItem.insertMany(selecteditems);
    const itemIds = itemDocs.map(item => item._id);

    if (existingMenu) {
      
      existingMenu.items.push(...itemIds);
      existingMenu.description = menu.description || existingMenu.description; 
      await existingMenu.save();

      return res.status(200).json({
        message: 'Menu updated successfully',
        menu: existingMenu,
      });
    } else {
     
      const newMenu = await Menu.create({
        name: menu.name,
        description: menu.description,
        items: itemIds,
      });

      return res.status(201).json({
        message: 'Menu created successfully',
        menu: newMenu,
      });
    }
  } catch (error) {
    console.error('Error creating/updating menu:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


// GET all menus
async function getAllMenu(req, res) {
  try {
    console.log("Fetching all menus...");
    const allMenus = await Menu.find().populate("items");
    console.log("Menus found:", allMenus.length);
    return res.status(200).json(allMenus);
  } catch (error) {
    console.error("Error fetching all menus:", error.message);
    console.error(error.stack);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getMenuItems,
  createMenu,
  getAllMenu,
};
