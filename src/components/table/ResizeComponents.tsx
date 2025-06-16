import React from "react";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css"; // nếu bạn dùng style mặc định

export const resizableComponents = {
  header: {
    cell: (props: any) => {
      const { onResize, width, ...restProps } = props;
      if (!width) return <th {...restProps} />;
      return (
        <Resizable
          width={width}
          height={0}
          handle={<span className="react-resizable-handle" />}
          onResize={onResize}
          draggableOpts={{ enableUserSelectHack: true }}
        >
          <th {...restProps} />
        </Resizable>
      );
    },
  },
};
