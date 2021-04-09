import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { withTranslation } from "react-i18next";

import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import CropperJS from "cropperjs";
import "cropperjs/dist/cropper.css";

import "./CropperDialog.scss";

const set = require("lodash.set");

const minRatio = 0.0;

class CropperDialog extends React.Component {
  constructor(props) {
    super(props);
    this.cropperRef = React.createRef();
    this.state = {
      ratio : props.tile.cropData?.zoomRatio ?? minRatio,
      loading : true
    }
    this.handleZoom = this.handleZoom.bind(this)
    this.handleCrop = this.handleCrop.bind(this)
    this.handleEntering = this.handleEntering.bind(this)
  }

  cropperInstance() {
    const self = this;
    const cropBoxSize = this.props.frame.frameStyle == "matting" ? 212 : 283;
    const imageElement = this.cropperRef?.current;
    const options = {
      aspectRatio: 1,
      initialAspectRatio: 1,
      viewMode: 1,
      dragMode: "move",
      guides: false,
      background: false,
      highlight:false,
      modal:false,
      responsive: true,
      autoCropArea: 1,
      autoCrop: true,
      rotatable: false,
      scalable: false,
      center: false,
      restore: true,
      cropBoxMovable: false,
      cropBoxResizable: false,
      checkOrientation: false,
      minCropBoxWidth:cropBoxSize,
      minCropBoxHeight:cropBoxSize,
      ready : function(){
        if(self.props.tile.cropBoxData){
          const zoomXPercent = (1 - (self.props.tile.cropBoxData.width - cropBoxSize)/self.props.tile.cropBoxData.width)
          const zoomYPercent = (1 - (self.props.tile.cropBoxData.height - cropBoxSize)/self.props.tile.cropBoxData.height)
          if(self.props.tile.canvasData){
            const {width : wCv,height : hCv,top,left} = self.props.tile.canvasData
            const newCanvasData = {
              ...self.props.tile.canvasData,
              width : wCv*zoomXPercent,
              height : hCv*zoomYPercent,
              top:top*zoomXPercent,
              left:left*zoomXPercent
            }
            this.cropper.setCanvasData(newCanvasData)
          }
        }
        self.setState({loading:false})
      },
      zoom: function (e) {
        self.setState({ ratio: e.detail.ratio });
      },
    };
    if (this.props.tile.aspectRatio > 1) {
      options.minCanvasHeight = cropBoxSize;
    } else if (this.props.tile.aspectRatio < 1) {
      options.minCanvasWidth = cropBoxSize;
    }
    return imageElement.cropper || new CropperJS(imageElement, options);
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (prevState.ratio != this.state.ratio) {
      const cropper = this.cropperInstance();
      cropper.zoomTo(this.state.ratio);
    }
  }
  handleEntering() {
    this.cropperInstance();
  }
  handleZoom(e, newValue) {
    this.setState({ ratio: newValue });
  }
  handleCrop() {
    const cropper = this.cropperInstance();
    const { tile, tiles, setTiles, onClose } = this.props;
    const newTile = {
      ...tile,
      cropData: cropper.getData(),
      cropBoxData: cropper.getCropBoxData(),
      canvasData: cropper.getCanvasData(),
      zoomRatio: this.state.ratio,
    };
    const newTiles = tiles.map((x) => {
      if (x.position == tile.position) {
        x = newTile;
      }
      return x;
    });
    setTiles(newTiles);
    onClose();
  }

  render() {
    const { open, onClose, tile, frame, onCrop } = this.props;
    const { ratio } = this.state;
    const cropBoxSize = frame.frameStyle == "matting" ? 212 : 283;
    return (
      <div className="cropper-dialog">
        <Dialog
          onClose={onClose}
          onEntering={this.handleEntering}
          aria-labelledby="customized-dialog-title"
          open={open}
          maxWidth="sm"
          fullScreen={window.innerWidth <= 960}
        >
          <MuiDialogTitle
            disableTypography
            className={"cropper-topbar"}
            id="customized-dialog-title"
          >
            <IconButton
              aria-label="close"
              className={"cropper-topbar--close-button"}
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
            <span className={"cropper-topbar--title"}>{"Adjust Crop"}</span>
            <span
              className={"cropper-topbar--done-button"}
              onClick={this.handleCrop}
            >
              {this.props.t("dialog.Done")}
            </span>
          </MuiDialogTitle>
          <MuiDialogContent className="cropper-content">
            <div className="dialog-content">
              <div className={"cropper-box-wrapper"}>
                <div
                  className={"cropper-box"}
                  style={{
                    width: cropBoxSize + "px",
                    height: cropBoxSize + "px",
                  }}
                >
                  <img
                    src={tile.localOriginalUrl}
                    id="hahhaa"
                    ref={this.cropperRef}
                  />
                </div>
                <div className={`frame-container ${frame.frameStyle}`}>
                  <div className="tile-base transparent"></div>
                  <div className={`TileFrame`}>
                    <img className={`frame`} src={frame.frameSVG} />
                  </div>
                </div>
              </div>
              <div className={"zoom-slider"}>
                <Grid container spacing={2}>
                  <Grid item className="icon">
                    <RemoveIcon
                      onClick={() =>
                        this.handleZoom(null, ratio - 0.2 > 0 ? ratio - 0.2 : 0)
                      }
                    />
                  </Grid>
                  <Grid item xs className="slider-main">
                    <Slider
                      track={false}
                      value={ratio}
                      min={minRatio}
                      max={2.5}
                      step={0.001}
                      onChange={this.handleZoom}
                      aria-labelledby="zoom-slider"
                    />
                  </Grid>
                  <Grid item className="icon">
                    <AddIcon
                      onClick={() =>
                        this.handleZoom(
                          null,
                          ratio + 0.2 < 2.5 ? ratio + 0.2 : 2.5
                        )
                      }
                    />
                  </Grid>
                </Grid>
                <div className="cropper-text with-scroller">
                {this.props.t("cropperDialog.Scroll to zoom, drag to move")} 
                </div>
              </div>
            </div>
          </MuiDialogContent>
        </Dialog>
      </div>
    );
  }
}
export default CropperDialog;
