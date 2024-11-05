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
};