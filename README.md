# 🌼 Dahlia Blocks

**A curated collection of accessible and elegant Gutenberg blocks designed for storytelling and educational content.**  
Built to integrate seamlessly with the [Dahlia theme](https://github.com/bertuuk/dahlia), but fully compatible with any FSE (Full Site Editing) WordPress theme.

![WordPress version](https://img.shields.io/badge/WordPress-6.0%2B-blue)
![PHP version](https://img.shields.io/badge/PHP-7.4%2B-blue)
![License](https://img.shields.io/badge/license-GPLv2-orange)

---

## ✨ Overview

**Dahlia Blocks** is a WordPress plugin that provides a focused set of custom blocks tailored for content-rich websites.  
Whether you're creating educational resources, long-form stories, or editorial layouts, these blocks help you structure and present content with clarity and style.

Although designed to pair perfectly with the [Dahlia theme](https://github.com/bertuuk/dahlia), the plugin works smoothly with any modern block-based theme.

---

## 📦 Included Blocks

### 🕒 Reading Time
- Displays an estimated reading time based on content length.
- Automatically calculated on the frontend.
- Accessible and semantic output.

### 🗂️ Post Grid
- Displays a responsive grid of posts.
- Filter by category, number of posts, or sort order.
- Built for visual flexibility using templates.

### 🧭 Category Grid
- Shows a grid of post categories with titles and optional thumbnails.
- Useful for topic overviews or site navigation.
- Can link to category archive pages.

### 🎯 Category Cover
- Highlights a single category with a large background image and title.
- Ideal for headers, section intros, or featured categories.

### 📖 Story Container
- A flexible container for storytelling content.
- Includes frontend controls to switch font size and toggle serif/sans-serif.
- Fully supports nested blocks (`InnerBlocks`).

---

## ⚙️ Installation

### Standard Installation

1. Download or clone this repository:
    ```bash
    git clone https://github.com/bertuuk/dahlia-blocks.git
    ```
2. Upload the `dahlia-blocks` folder to your `/wp-content/plugins/` directory.
3. Activate the plugin in the WordPress admin.

### Development Setup

If you're working from source:

```bash
npm install
npm run build
```

Requires Node.js and npm.

---

## ✅ Compatibility

- WordPress 6.0+
- Full Site Editing (FSE) themes
- Block Editor (Gutenberg)
- PHP 7.4+
- Multilingual-ready (includes `.pot` file)
- Accessibility-first approach

---

## 🧠 Why use Dahlia Blocks?

- Focused: Includes only useful, lightweight blocks.
- Accessible: Follows WAI-ARIA and semantic HTML best practices.
- Customizable: Works with global styles and `theme.json`.
- Built for storytelling: Designed with content-first layouts in mind.

---

## 🖼️ Screenshots

| Block             | Preview                  |
|------------------|--------------------------|
| Reading Time      | *(screenshot placeholder)* |
| Post Grid         | *(screenshot placeholder)* |
| Category Grid     | *(screenshot placeholder)* |
| Category Cover    | *(screenshot placeholder)* |
| Story Container   | *(screenshot placeholder)* |

> 💡 Add preview images to a `/screenshots` folder to enable real previews here.

---

## ❓ FAQ

### Do I need the Dahlia theme to use these blocks?

No, but the plugin is visually and structurally optimized for it. You can use the blocks with any FSE-compatible theme.

### Can I override the styles?

Yes! The blocks respect editor and global styles. You can also override or extend them via CSS or your `theme.json`.

### Are these blocks accessible?

Yes. Accessibility is a core priority in every block's markup and behavior.

---

## 📄 License

This plugin is licensed under the [GPLv2 or later](https://www.gnu.org/licenses/gpl-2.0.html).

---

## 👤 Author

Developed and maintained by [@bertuuk](https://github.com/bertuuk)