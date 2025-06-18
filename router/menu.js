const express = require('express')
const { getMenuItems, createMenu, getAllMenu } = require('../controller/menu')

const router = express.Router()
router.get('/all', getAllMenu)
router.get('/:menuId', getMenuItems)
router.post('/', createMenu)


module.exports = router