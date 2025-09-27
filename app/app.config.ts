export default defineAppConfig({
  ui: {
    colors: {
      primary: `blue`,
      info: `blue`,
      commentary: `fuchsia`,
      ideation: `violet`,
      creator: `teal`,
      neutral: `neutral`
    },
    icons: {
      close: `lucide:x`,
      chevronLeft: `lucide:chevron-left`,
      chevronRight: `lucide:chevron-right`,
      folder: `lucide:folder`,
      folderOpen: `lucide:folder-open`
    },
    banner: {
      slots: {
        icon: `text-highlighted`,
        title: `text-highlighted`,
        close: `text-highlighted`
      }
    },
    footer: {
      slots: {
        root: `py-8`
      }
    },
    page: {
      slots: {
        root: `lg:gap-6`
      }
    },
    pageCTA: {
      slots: {
        root: `rounded-none`
      }
    },
    contentToc: {
      defaultVariants: {
        highlight: true,
        highlightColor: `primary`
      }
    },
    popover: {
      defaultVariants: {
        arrow: true
      }
    },
    tooltip: {
      defaultVariants: {
        arrow: true
      }
    },
    dropdownMenu: {
      defaultVariants: {
        arrow: true
      }
    },
    dashboardSidebar: {
      slots: {
        header: `border-b border-default`,
        footer: `border-t border-default`
      },
      defaultVariants: {
        resizable: true,
        collapsible: true
      }
    },
    prose: {
      p: {
        base: `my-0 mt-2`
      }
    }
  }
})
