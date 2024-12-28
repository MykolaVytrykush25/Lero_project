import { alpha, createTheme } from "@mui/material";

const transition = "all .25s ease-in-out";

const colors = {
  black: "#000000",
  white: "#FFFFFF",
  foreground: "#7bb9ff",
  blueGray: "#7a8895",
  black500: "#121212",
  gray400: "#1E1E1E",
  gray600: "#090e15",
  darkGray100: "#142133",
  darkGray400: "#1C2430",
  darkGray500: "#0F1824",
  darkGray600: "#1F3047",
  darkGray800: "#121B28",
};

const colorTheme = createTheme({
  palette: {
    primary: {
      main: "#13F195",
    },
    secondary: {
      main: "#1C2430",
    },
    divider: "#142133",
  },
});

export const theme = createTheme({
  ...colorTheme,
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "8px",

          "& .MuiOutlinedInput-root": {
            padding: 0,

            "& fieldset": {
              transition: transition,
              borderColor: "transparent",
              borderWidth: 1,
            },
            "&:hover fieldset": {
              borderColor: "transparent",
            },
            "&.Mui-focused fieldset": {
              borderWidth: 1,
              borderColor: colorTheme.palette.primary.main,
            },
            "&.MuiInputBase-multiline": {
              minHeight: "48px",
            },
          },
          "& .MuiInputLabel-root": {
            color: colors.blueGray,
            fontSize: "16px",
            transform: "translate(16px, 12px) scale(1)",
          },
          "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiFormLabel-filled": {
            transform: "translate(12px, -8px) scale(0.75)",
            border: "none",
            color: colors.white,
          },
          "& .MuiInputBase-root": {
            height: "48px",
            backgroundColor: alpha(colors.foreground, 0.05),
            "&.MuiInputBase-multiline": {
              height: "auto",
            },
          },
          "& .MuiInputBase-input": {
            color: colors.white,
            fontSize: "16px",
            padding: "12px",
            height: "48px",
            boxSizing: "border-box",
            "&.MuiInputBase-inputMultiline": {
              padding: "12px",
              height: "auto",
            },
            "&::-webkit-inner-spin-button": {
              display: "none",
            },
            "&::-webkit-outer-spin-button": {
              display: "none",
            },
            "&[type='number']": {
              MozAppearance: "textfield",
            },
          },
          "& .MuiInputBase-input::placeholder": {
            color: colors.blueGray,
          },
          "& .MuiFormHelperText-root": {
            backgroundColor: "none",
            color: colors.blueGray,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          height: "48px",
          backgroundColor: alpha(colors.foreground, 0.05),
          color: colors.white,
          minWidth: "auto",

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: colorTheme.palette.primary.main,
            borderWidth: 0,
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
            borderWidth: 0,
            transition: transition,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderWidth: 0,
          },
          "&.MuiInputLabel-root": {
            color: `${colors.blueGray} !important`,
          },
          "&.Mui-disabled": {
            backgroundColor: colors.darkGray500,

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.darkGray500,
            },
            "& .MuiSelect-select": {
              WebkitTextFillColor: colors.darkGray600,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.darkGray500,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.darkGray500,
            },
            "& .MuiSelect-icon": {
              color: colors.blueGray,
            },
          },
        },
        icon: {
          transition: transition,
          color: colors.blueGray,
        },
        iconOpen: {
          transform: "rotate(180deg)",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          padding: 0,

          "& .MuiOutlinedInput-root": {
            padding: 0,
            borderRadius: "8px",

            "& fieldset": {
              border: "none",
            },
            "&:hover fieldset": {
              border: "none",
            },
            "&.Mui-focused fieldset": {
              border: "none",
            },
          },

          "& .MuiInputBase-input": {
            "&.Mui-disabled": {
              "-webkit-text-fill-color": colors.darkGray600,
              color: colors.darkGray600,
            },
          },

          "& .MuiInputBase-root.Mui-disabled": {
            backgroundColor: colors.darkGray500,
          },

          "& .MuiAutocomplete-popupIndicator.Mui-disabled": {
            color: colors.blueGray,
          },
        },
        input: {
          padding: `12px 16px !important`,
        },
        popupIndicator: {
          color: colors.blueGray,
        },
        popper: {
          zIndex: 100,
        },
        paper: {
          marginTop: "8px",
          backgroundColor: colors.gray600,
          color: colors.white,
          borderRadius: "8px",
          boxShadow: `0px 1px 7.2px 0px ${alpha(colors.black, 0.25)}`,
        },
        listbox: {
          padding: 0,
        },
        option: {
          color: colors.blueGray,
          transition: transition,

          "&.Mui-focused": {
            backgroundColor: alpha(colors.white, 0.03),
          },
          "&.Mui-selected": {
            color: colorTheme.palette.primary.main,
            backgroundColor: alpha(colorTheme.palette.primary.main, 0.3),
          },
          "&.Mui-selected.Mui-focused": {
            backgroundColor: alpha(colorTheme.palette.primary.main, 0.3),
          },
        },
        noOptions: {
          color: colors.blueGray,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          marginTop: "8px",
          backgroundColor: colors.gray600,
          color: colors.white,
          borderRadius: "8px",
          zIndex: "100",
          boxShadow: `0px 1px 7.2px 0px ${alpha(colors.black, 0.25)}`,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: colors.blueGray,
          transition: transition,

          "&.Mui-selected": {
            color: colorTheme.palette.primary.main,
            backgroundColor: alpha(colorTheme.palette.primary.main, 0.3),
          },
          "&:hover": {
            backgroundColor: alpha(colors.white, 0.03),
          },
          "&.Mui-selected:hover": {
            backgroundColor: alpha(colorTheme.palette.primary.main, 0.3),
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontSize: "14px",
          fontWeight: 600,
          boxShadow: "none",
          transition: transition,
          boxSizing: "border-box",
          whiteSpace: "nowrap",

          "&.MuiLoadingButton-root": {
            backgroundColor: colorTheme.palette.primary.main,
            color: colorTheme.palette.primary.contrastText,
            "&:hover": {
              backgroundColor: colorTheme.palette.primary.dark,
            },
            "&:not(.MuiLoadingButton-loading):disabled": {
              backgroundColor: colors.darkGray500,
              color: colors.darkGray600,
            },
          },
          "&:not(.MuiLoadingButton-root):disabled": {
            backgroundColor: colors.darkGray500,
            color: colors.darkGray600,
          },
        },
        sizeSmall: {
          borderRadius: "8px",
          padding: "4px 12px",
          height: "32px",
        },
        sizeMedium: {
          padding: "12px 16px",
          height: "48px",
        },
        contained: {
          color: colors.black500,
        },
        outlined: {
          borderColor: colorTheme.palette.primary.main,
          color: colors.white,

          "&:hover": {
            color: "rgba(255,255,255, 0.7)",
          },
          "&:active": {
            color: "rgba(255,255,255, 0.8)",
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          width: "24px",
          height: "24px",
          color: colors.blueGray,
          padding: 0,

          "&.Mui-checked": {
            color: colorTheme.palette.primary.main,
          },
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: 0,
          color: colors.blueGray,

          "&.Mui-checked": {
            color: "#13F195",
          },
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          padding: "8px 16px",
          color: "#FFFFFF",
          transition: transition,

          "&.Mui-disabled": {
            color: colors.darkGray400,
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "14px",
          backgroundColor: colors.darkGray500,
          padding: "8px",
          borderRadius: "10px",
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(colors.white, 0.05),
          border: "none",
          color: alpha(colors.white, 0.5),
          fontSize: "14px",
          transition: "all 0.25s ease-in-out",

          "&:hover": {
            color: colors.white,
          },
        },
        clickable: {
          "&:hover": {
            backgroundColor: alpha(colors.white, 0.05),
          },
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          "&.MuiModal-root": {
            margin: "24px",
          },

          "&.MuiMenu-root": {
            margin: "0",
          },
          "& *": {
            outline: "none !important",
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: colors.darkGray800,
          borderRadius: "10px",
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        root: {
          color: colorTheme.palette.primary.main,
        },
        iconEmpty: {
          color: colors.blueGray,
        },
        iconHover: {
          color: colorTheme.palette.primary.main,
        },
        iconFilled: {
          color: colorTheme.palette.primary.main,
        },
        icon: {
          fontSize: "24px",
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: colors.blueGray,
          fontWeight: 600,
          padding: "8px",
          border: `1px solid ${colors.darkGray100}`,
          width: 32,
          height: 32,

          "&.Mui-selected": {
            backgroundColor: colorTheme.palette.primary.main,
          },
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          minWidth: "20px",
          height: "20px",
          fontSize: "10px",
          padding: "0",
          color: colors.black500,
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          margin: "0 2px",

          "svg path": {
            fill: colors.blueGray,
          },
        },
      },
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          display: "flex",
          overflowX: "auto",
          width: "100%",
          ".MuiBreadcrumbs-ol": {
            flexWrap: "nowrap",
          },
          ".MuiBreadcrumbs-separator": {
            flexShrink: 0,
          },
          p: {
            whiteSpace: "nowrap",
          },
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          padding: "4px",
          backgroundColor: colors.gray600,
          borderRadius: "8px",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          border: "none",
          padding: "8px 20px",
          fontSize: "16px",
          lineHeight: "24px",
          textTransform: "none",
          color: colors.white,
          transition: transition,
          overflow: "hidden",
          "&.Mui-selected": {
            backgroundColor: alpha(colors.foreground, 0.05),
            color: colors.white,
            "&:hover": {
              backgroundColor: alpha(colors.foreground, 0.1),
            },
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          margin: 0,
          display: "flex",
          alignItems: "center",
          gap: 8,
        },
      },
    },
  },
});
