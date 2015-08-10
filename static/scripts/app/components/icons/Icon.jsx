import React from 'react'

class IconBase extends React.Component {
    constructor(props) {
        super(props)
        this.svgProps = {
            'version': "1.1",
            'xmlns': "http://www.w3.org/2000/svg",
            'xmlns:xlink': "http://www.w3.org/1999/xlink",
            'x': "0px",
            'y': "0px",
            'width': "512px",
            'height': "512px",
            'viewBox': "0 0 512 512",
            'className': 'qu-icon',
            'style': {
                'enableBackground': "new 0 0 512 512"
            },
            'xml:space': "preserve"
        };
        this.props = Object.assign(this.svgProps, this.props)
        this.path = '';
        this.points = '';
    }

    render() {
      let inner = false
      if (this.path) {
        inner = <g><path d={this.path} /></g>
      } else if (this.points) {
        inner = <polygon points={this.points} />
      } else {
        return false
      }
      return (
        <svg {...this.props}>
          {inner}
        </svg>
      );
    }
}

export default IconBase;
