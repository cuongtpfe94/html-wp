/**
 * Component Loader Utility
 * Loads HTML components dynamically and injects them into the page
 */
class ComponentLoader {
  constructor() {
    this.cache = new Map();
  }

  /**
   * Loads a component and injects it into the specified container
   * @param {string} componentPath - Path to the component HTML file
   * @param {string} containerId - ID of the container element
   * @returns {Promise<void>}
   */
  async loadComponent(componentPath, containerId) {
    try {
      const container = document.getElementById(containerId);
      if (!container) {
        throw new Error(`Container with id "${containerId}" not found`);
      }

      let componentHTML;
      if (this.cache.has(componentPath)) {
        componentHTML = this.cache.get(componentPath);
      } else {
        const response = await fetch(componentPath);
        if (!response.ok) {
          throw new Error(`Failed to load component: ${response.statusText}`);
        }
        componentHTML = await response.text();
        this.cache.set(componentPath, componentHTML);
      }

      container.innerHTML = componentHTML;
      this.initializeComponent(containerId);
    } catch (error) {
      console.error("Error loading component:", error);
    }
  }

  /**
   * Initialize component functionality after loading
   * @param {string} containerId - ID of the container element
   */
  initializeComponent(containerId) {
    const container = document.getElementById(containerId);

    // Initialize sidebar toggle functionality
    if (containerId === "sidebar-container") {
      const closeBtn = container.querySelector("[data-close-sidebar]");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          container
            .querySelector(".sidebar")
            .classList.remove("sidebar--active");
        });
      }
    }

    // Initialize mobile menu toggle for header
    if (containerId === "header-container") {
      const menuToggle = container.querySelector(".nav__menu-toggle");
      const menu = container.querySelector(".nav__menu");
      if (menuToggle && menu) {
        menuToggle.addEventListener("click", () => {
          menu.classList.toggle("nav__menu--active");
        });
      }
    }
  }
}

// Export the ComponentLoader class
export const componentLoader = new ComponentLoader();
