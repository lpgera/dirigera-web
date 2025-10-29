import React, { HTMLAttributes } from "react";
import "./Grid.css";

interface RowProps extends HTMLAttributes<HTMLDivElement> {
  gutter?: [number, number] | number;
  align?: "top" | "middle" | "bottom";
}

export function Row({
  gutter,
  align,
  children,
  className = "",
  ...props
}: RowProps) {
  const gutterClass = Array.isArray(gutter)
    ? `row-gutter-${gutter[0]}`
    : gutter
      ? `row-gutter-${gutter}`
      : "";

  const alignClass = align ? `row-align-${align}` : "";

  return (
    <div className={`row ${gutterClass} ${alignClass} ${className}`} {...props}>
      {children}
    </div>
  );
}

interface ColProps extends HTMLAttributes<HTMLDivElement> {
  span?: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
  flex?: string | number;
}

export function Col({
  span,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  flex,
  children,
  className = "",
  style = {},
  ...props
}: ColProps) {
  const classes = [
    "col",
    span && `col-span-${span}`,
    xs && `col-xs-${xs}`,
    sm && `col-sm-${sm}`,
    md && `col-md-${md}`,
    lg && `col-lg-${lg}`,
    xl && `col-xl-${xl}`,
    xxl && `col-xxl-${xxl}`,
    flex === "none" && "col-flex-none",
    flex === "auto" && "col-flex-auto",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const colStyle =
    typeof flex === "number" ||
    (typeof flex === "string" && flex !== "none" && flex !== "auto")
      ? { ...style, flex }
      : style;

  return (
    <div className={classes} style={colStyle} {...props}>
      {children}
    </div>
  );
}

export function useBreakpoint() {
  const [breakpoints, setBreakpoints] = React.useState({
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
    xxl: false,
  });

  React.useEffect(() => {
    const updateBreakpoints = () => {
      const width = window.innerWidth;
      setBreakpoints({
        xs: width < 576,
        sm: width >= 576 && width < 768,
        md: width >= 768 && width < 992,
        lg: width >= 992 && width < 1200,
        xl: width >= 1200 && width < 1600,
        xxl: width >= 1600,
      });
    };

    updateBreakpoints();
    window.addEventListener("resize", updateBreakpoints);
    return () => window.removeEventListener("resize", updateBreakpoints);
  }, []);

  return breakpoints;
}
