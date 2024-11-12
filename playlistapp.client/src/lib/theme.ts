export const materialTheme = {
  menu: {
    styles: {
      base: {
        menu: {
          bg: "bg-clay-600 ",
          minWidth: "min-w-[75px]",
          width: "sm:w-[180px] w-1/3",
          p: "p-3",
          border: "border border-none",
          borderRadius: "rounded-md",
          boxShadow: "shadow-lg shadow-blue-gray-500/10",
          fontFamily: "font-sans",
          fontSize: "sm:text-sm text-[11.2px]",
          fontWeight: "font-normal",
          color: "text-white",
          overflow: "overflow-auto",
          outline: "focus:outline-none",
          zIndex: "z-[999]",
        },
        item: {
          initial: {
            display: "block",
            width: "w-full",
            pt: "pt-[9px]",
            pb: "pb-2",
            px: "sm:px-3",
            borderRadius: "rounded-md",
            textAlign: "text-start",
            lightHeight: "leading-tight",
            cursor: "cursor-pointer",
            userSelect: "select-none",
            transition: "transition-all",
            bg: "hover:bg-blue-gray-50 hover:bg-opacity-80 focus:bg-blue-gray-50 focus:bg-opacity-80 active:bg-blue-gray-50 active:bg-opacity-80",
            color: "text-white",
            outline: "outline-none",
          },
        },
      },
    },
  },
  accordion: {
    defaultProps: {
      icon: undefined,
      className: "",
      animate: {
        unmount: {},
        mount: {},
      },
      disabled: false,
    },
    styles: {
      base: {
        container: {
          display: "block",
          position: "relative",
          width: "w-full",
        },
        header: {
          initial: {
            display: "flex",
            justifyContent: "justify-between",
            alignItems: "items-center",
            width: "w-full",
            py: "py-4",
            borderWidth: "border-b border-b-blue-gray-100",
            color: "text-blue-gray-700",
            fontSmoothing: "antialiased",
            fontFamily: "font-sans",
            fontSize: "sm:text-xl text-tiny",
            textAlign: "text-left",
            fontWeight: "font-semibold",
            lineHeight: "leading-snug",
            userSelect: "select-none",
            hover: "hover:text-blue-gray-900",
            transition: "transition-colors",
          },
          active: { color: "text-blue-gray-900" },
          icon: {
            ml: "ml-4",
          },
        },
        body: {
          display: "block",
          width: "w-full",
          py: "py-4",
          color: "text-gray-700",
          fontSmoothing: "antialiased",
          fontFamily: "font-sans",
          fontSize: "text-sm",
          fontWeight: "font-light",
          lineHeight: "leading-normal",
        },
        disabled: {
          pointerEvents: "pointer-events-none",
          opacity: "opacity-50",
        },
      },
    },
  },
  dialog: {
    defaultProps: {
      size: "md",
      dismiss: {},
      animate: {
        unmount: {},
        mount: {},
      },
      className: "",
    },
    valid: {
      sizes: ["xs", "sm", "md", "lg", "xl", "xxl"],
    },
    styles: {
      base: {
        backdrop: {
          display: "grid",
          placeItems: "place-items-center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "w-screen",
          height: "h-screen",
          backgroundColor: "bg-black",
          backgroundOpacity: "bg-opacity-60",
          backdropFilter: "backdrop-blur-sm",
        },
        container: {
          position: "relative",
          bg: "bg-white",
          m: "m-4",
          borderRadius: "rounded-lg",
          boxShadow: "shadow-2xl",
          color: "text-blue-gray-500",
          fontSmoothing: "antialiased",
          fontFamily: "'Josefin Sans', sans-serif",
          fontSize: "text-base",
          fontWeight: "font-light",
          lineHeight: "leading-relaxed",
        },
      },
      sizes: {
        xs: {
          width: "w-full md:w-3/5 lg:w-2/5 2xl:w-1/4",
          minWidth: "min-w-[80%] md:min-w-[60%] lg:min-w-[40%] 2xl:min-w-[25%]",
          maxWidth: "max-w-[80%] md:max-w-[60%] lg:max-w-[40%] 2xl:max-w-[25%]",
        },
        sm: {
          width: "w-full md:w-2/3 lg:w-2/4 2xl:w-1/3",
          minWidth:
            "min-w-[80%] md:min-w-[66.666667%] lg:min-w-[50%] 2xl:min-w-[33.333333%]",
          maxWidth:
            "max-w-[80%] md:max-w-[66.666667%] lg:max-w-[50%] 2xl:max-w-[33.333333%]",
        },
        md: {
          width: "w-full md:w-3/4 lg:w-3/5 2xl:w-2/5",
          minWidth: "min-w-[90%] md:min-w-[75%] lg:min-w-[60%] 2xl:min-w-[40%]",
          maxWidth: "max-w-[90%] md:max-w-[75%] lg:max-w-[60%] 2xl:max-w-[40%]",
        },
        lg: {
          width: "w-full md:w-5/6 lg:w-3/4 2xl:w-3/5",
          minWidth:
            "min-w-[90%] md:min-w-[83.333333%] lg:min-w-[75%] 2xl:min-w-[60%]",
          maxWidth:
            "max-w-[90%] md:max-w-[83.333333%] lg:max-w-[75%] 2xl:max-w-[60%]",
        },
        xl: {
          width: "w-full md:w-5/6 2xl:w-3/4",
          minWidth: "min-w-[95%] md:min-w-[83.333333%] 2xl:min-w-[75%]",
          maxWidth: "max-w-[95%] md:max-w-[83.333333%] 2xl:max-w-[75%]",
        },
        xxl: {
          display: "flex",
          flexDirection: "flex-col",
          width: "w-screen",
          minWidth: "min-w-[100vw]",
          maxWidth: "max-w-[100vw]",
          height: "h-screen",
          minHeight: "min-h-[100vh]",
          maxHeight: "max-h-[100vh]",
          m: "m-0",
          borderRadius: "rounded-none",
        },
      },
    },
  },
  dialogBody: {
    defaultProps: {
      className: "",
      divider: false,
    },
    styles: {
      base: {
        initial: {
          position: "relative",
          p: "p-4",
          color: "text-blue-gray-500",
          fontSmoothing: "antialiased",
          fontFamily: "'Josefin Sans', sans-serif",
          fontSize: "text-base",
          fontWeight: "font-light",
          lineHeight: "leading-relaxed",
        },
        divider: {
          borderTop: "border-t",
          borderTopColor: "border-t-blue-gray-100",
          borderBottom: "border-b",
          borderBottomColor: "border-b-blue-gray-100",
        },
      },
    },
  },
};
