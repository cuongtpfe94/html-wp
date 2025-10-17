const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const clean = require("gulp-clean");
const rename = require("gulp-rename");
const nunjucksRender = require("gulp-nunjucks-render");

// Clean dist directory
gulp.task("clean", () => {
  return gulp.src("dist", { allowEmpty: true }).pipe(clean());
});

// Compile SCSS to CSS
gulp.task("styles", () => {
  return gulp
    .src(["src/scss/**/*.scss", "src/components/**/*.scss"])
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest("dist/css"))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

// Compile Nunjucks to HTML
gulp.task("nunjucks", () => {
  return gulp
    .src("src/pages/**/*.njk")
    .pipe(
      nunjucksRender({
        path: ["src/templates", "src/components", "src"],
        data: {
          site: {
            title: "HTML Management System",
            description: "A collection of reusable HTML/CSS components",
          },
          navigation: require("./src/data/navigation.json"),
          notifications: require("./src/data/notifications.json"),
          sidebarData: require("./src/data/sidebar.json"),
          footerData: require("./src/data/footer.json"),
          announcementData: require("./src/data/announcement-form.json"),
          topicData: require("./src/data/topic-form.json"),
          standardFormData: require("./src/data/standard-form.json"),
          jisListData: require("./src/data/jis-list.json"),
          downloadFormData: require("./src/data/download-form.json"),
        },
      })
    )
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
});

// Copy assets
gulp.task("assets", () => {
  return gulp
    .src("src/assets/**/*")
    .pipe(gulp.dest("dist/assets"))
    .pipe(browserSync.stream());
});

// Watch files
gulp.task("watch", () => {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
    port: 3000,
    open: true,
    notify: false,
  });

  // Watch Nunjucks templates and data
  gulp.watch(["src/**/*.njk", "src/data/**/*.json"], gulp.series("nunjucks"));

  // Watch SCSS files
  gulp.watch(
    ["src/scss/**/*.scss", "src/components/**/*.scss"],
    gulp.series("styles")
  );

  // Watch assets
  gulp.watch("src/assets/**/*", gulp.series("assets"));
});

// Build task
gulp.task("build", gulp.series("clean", "styles", "nunjucks", "assets"));

// Default task
gulp.task("default", gulp.series("build", "watch"));

// Compile banner-list SCSS to CSS
gulp.task("banner-styles", () => {
  return gulp
    .src("src/components/banner-list/banner-list.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest("dist/css/banner-list"))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/css/banner-list"))
    .pipe(browserSync.stream());
});

// Update watch task
gulp.task("watch", () => {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
    port: 3000,
    open: true,
    notify: false,
  });

  // Watch Nunjucks templates and data
  gulp.watch(["src/**/*.njk", "src/data/**/*.json"], gulp.series("nunjucks"));

  // Watch SCSS files
  gulp.watch(
    [
      "src/scss/**/*.scss",
      "src/components/**/*.scss",
      "!src/components/banner-list/banner-list.scss",
    ],
    gulp.series("styles")
  );

  // Watch banner-list SCSS
  gulp.watch(
    "src/components/banner-list/banner-list.scss",
    gulp.series("banner-styles")
  );

  // Watch assets
  gulp.watch("src/assets/**/*", gulp.series("assets"));
});

// Update build task
gulp.task(
  "build",
  gulp.series("clean", "styles", "banner-styles", "nunjucks", "assets")
);

// Default task remains the same
gulp.task("default", gulp.series("build", "watch"));
