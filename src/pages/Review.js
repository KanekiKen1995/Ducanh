import React, { useEffect, useState, useRef } from "react";
import { Fixed } from "../components/Header";
import { CropperDialog } from "../components/CropperDialog";
import {
  uploadPhoto,
  uploadFb,
  uploadIns,
  removeTile,
  cropTile,
  frameNone,
  frameBlack,
  frameWhite,
} from "../assets/icons";
import { useTranslation } from "react-i18next";
import Drawer from "@material-ui/core/Drawer";

import CropperJS from "cropperjs";
import "cropperjs/dist/cropper.css";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Dialog } from "@material-ui/core";

import "../assets/css/components/MenuCheckOut/index.scss";

const debounce = require("lodash.debounce");

const borderRatio = 0.7;

const Review = () => {
  const { t } = useTranslation();
  const [tiles, setTiles] = useState([]);
  const [selectedFrame, setSelectedFrame] = useState("ever");

  useEffect(() => {}, []);

  const handleChooseFiles = (e) => {
    const prevPosition = tiles.length || 0;
    const files = Array.from(e.target.files);
    const urlFiles = files.map((file, i) => {
      return {
        localOriginalUrl: URL.createObjectURL(file),
        cropData: null,
        croppedImage: null,
        position: prevPosition + i,
      };
    });
    setTiles(tiles.concat(urlFiles));
  };

  return (
    <div className="review-order-page">
      <Fixed
        selectedFrame={selectedFrame}
        setSelectedFrame={setSelectedFrame}
        tiles={tiles}
      />
      <div className="content empty">
        {tiles.length ? (
          <>
            <Tiles
              t={t}
              tiles={tiles}
              setTiles={setTiles}
              selectedFrame={selectedFrame}
              handleChooseFiles={handleChooseFiles}
            />
            <LowQualityImages tiles={tiles} setTiles={setTiles} />
          </>
        ) : (
          <div className="no-tiles-placeholder show">
            <div className="no-tiles-text desktop">
              {t("review.Pick some photos to get started")}
            </div>
            <div className="UploadMenu desktop full">
              <div className="upload-buttons full">
                <label className="upload-button photo">
                  <div className="button-icon">
                      <svg width="39" height="29" viewBox="0 0 39 29" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M5 5C2.23858 5 0 7.23858 0 10V24C0 26.7614 2.23858 29 5 29H34C36.7614 29 39 26.7614 39 24V10C39 7.23858 36.7614 5 34 5H28L26.5029 1.25722C26.1992 0.497902 25.4637 0 24.6459 0H14.3541C13.5363 0 12.8008 0.497903 12.4971 1.25722L11 5H5ZM30.5 9C29.6716 9 29 9.67157 29 10.5C29 11.3284 29.6716 12 30.5 12H33.5C34.3284 12 35 11.3284 35 10.5C35 9.67157 34.3284 9 33.5 9H30.5ZM27 17C27 20.866 23.866 24 20 24C16.134 24 13 20.866 13 17C13 13.134 16.134 10 20 10C23.866 10 27 13.134 27 17ZM20 21C22.2091 21 24 19.2091 24 17C24 14.7909 22.2091 13 20 13C17.7908 13 16 14.7909 16 17C16 19.2091 17.7908 21 20 21Z"></path></svg>
                  </div>
                  <div className="text">
                    <p>{t("review.Upload Photos")}</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleChooseFiles}
                  />
                </label>
              </div>
            </div>
            <label htmlFor="upload-photo" className="mobile">
              <input
                style={{ display: "none" }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                accept="image/*"
                multiple
                onChange={handleChooseFiles}
              />
              <Fab variant="round" component="span" className="btn">
                <AddIcon color="secondary" className='icon'></AddIcon>
              </Fab>
            </label>
            <div className="no-tiles-text-mobile mobile">
              {t("review.Pick some photos to get started")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const LowQualityImages = (props) => {
  const { tiles, setTiles } = props;
  const { t } = useTranslation();
  const [openDrawer, setOpenDrawer] = useState(true);
  const lowQualityTiles = [];
  tiles.forEach((tile) => {
    if (
      !tile.keepAnyway &&
      tile.naturalHeight < 800 &&
      tile.naturalWidth < 800
    ) {
      lowQualityTiles.push(tile);
    }
  });
  const handleKeepAnyway = (tile) => {
    const newTiles = tiles.map((t) => {
      const newTile = { ...t };
      if (t.position == tile.position) {
        newTile.keepAnyway = true;
      }
      return newTile;
    });
    setTiles(newTiles);
    setOpenDrawer(false);
  };
  const handleRemove = (tile) => {
    const newTiles = tiles.filter((t) => t.position != tile.position);
    setTiles(newTiles);
    setOpenDrawer(false);
  };
  const tile = lowQualityTiles.length > 0 && lowQualityTiles[0];

  useEffect(() => {
    setTimeout(() => {
      setOpenDrawer(true);
    }, 200);
  }, [openDrawer]);
  return (
    <React.Fragment>
      <Drawer
        className={"low-quality-images-drawer"}
        anchor={"bottom"}
        open={tile && openDrawer}
      >
        <div className="low-quality-images">
          <div className="warning-content" style={{ transform: "none" }}>
            <div className="basic-dialog">
              <div className="dialog-content">
                <div className="dialog-title">
                  {t("review.Low Image Quality")}
                </div>
                <img
                  className="dialog-image"
                  src={
                    tile.croppedImage && URL.createObjectURL(tile.croppedImage)
                  }
                  alt="Dialog"
                />
                <div className="dialog-text">{t("review.This photo")}</div>
              </div>
            </div>
          </div>
          <div className="warning-buttons">
            <div
              className="dialog-button highlighted no-border"
              onClick={() => handleKeepAnyway(tile)}
            >
              {t("review.Keep Anyway")}
            </div>
            <div className="dialog-button" onClick={() => handleRemove(tile)}>
              {t("review.Remove From Order")}
            </div>
          </div>
        </div>
      </Drawer>
    </React.Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: "fixed",
    bottom: theme.spacing(12),
    right: theme.spacing(3),
    zIndex: 3,
  },
  buttonUpload: {
    width: "70px",
    height: "70px",
    background: "#fff",
    "&:hover": {
      background: "#fff",
    },
  },
  iconBtn: {
    fontSize: "2.5rem",
  },
  [theme.breakpoints.up("md")]: {
    absolute: {
      display: "none",
    },
  },
}));
const Tiles = (props) => {
  const classes = useStyles();
  return (
    <div className="tiles-wrapper">
      <div className="tiles">
        <label htmlFor="upload-photo" className={classes.absolute}>
          <input
            style={{ display: "none" }}
            id="upload-photo"
            name="upload-photo"
            type="file"
            accept="image/*"
            multiple
            onChange={props.handleChooseFiles}
          />
          <Fab
            variant="round"
            component="span"
            className={classes.buttonUpload}
          >
            <AddIcon color="secondary" className={classes.iconBtn}></AddIcon>
          </Fab>
        </label>
        {props.tiles.map((tile, index) => (
          <Tile key={`tile-${index}`} tile={tile} {...props} />
        ))}
        <label className="UploadButton right-side desktop">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={props.handleChooseFiles}
            style={{ display: "none" }}
          />
          <div className="plus-icon">
            <svg width={59} height={59} viewBox="0 0 59 59" fill="none">
              <rect
                x="24.6003"
                y="0.107956"
                width="10.2462"
                height="58.1695"
                rx="5.1231"
              />
              <rect
                x="58.8083"
                y="24.0696"
                width="10.2462"
                height="58.1695"
                rx="5.1231"
                transform="rotate(90 58.8083 24.0696)"
              />
            </svg>
          </div>
          <div className="UploadMenu desktop square">
            <div className="upload-buttons square" />
          </div>
        </label>
      </div>
    </div>
  );
};

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.cropperRef = React.createRef();
    this.state = {
      openDialog: false,
      openDialogConfirmEdit: false,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleManualCrop = this.handleManualCrop.bind(this);
    this.handleManualCrop = this.handleManualCrop.bind(this);
    this.handleOpenDialogConfirmEdit = this.handleOpenDialogConfirmEdit.bind(
      this
    );
  }

  handleOpenDialog() {
    this.setState({ openDialog: true });
    this.handleOpenDialogConfirmEdit(false);
  }
  handleOpenDialogConfirmEdit(value) {
    this.setState({ openDialogConfirmEdit: value });
  }
  handleCloseDialog() {
    this.setState({ openDialog: false });
  }
  handleManualCrop(params) {}
  handleRemoveTile(position) {
    const newTiles = this.props.tiles
      .filter((tile) => tile.position != position)
      .map((tile, index) => {
        return {
          ...tile,
          position: index,
        };
      });
    this.props.setTiles(newTiles);
    this.handleOpenDialogConfirmEdit(false);
  }

  cropperInstance() {
    const self = this;
    const imageElement = this.cropperRef?.current;
    return (
      imageElement.cropper ||
      new CropperJS(imageElement, {
        aspectRatio: 1,
        initialAspectRatio: 1,
        viewMode: 1,
        dragMode: "move",
        guides: false,
        disabled: true,
        highlight:false,
        modal:false,
        background: false,
        minCropBoxHeight: 10,
        minCropBoxWidth: 10,
        responsive: true,
        autoCropArea: 1,
        autoCrop: true,
        rotatable: false,
        scalable: false,
        cropBoxMovable: false,
        cropBoxResizable: false,
        checkOrientation: false,
        data: self.props.tile.cropData,
        crop: debounce(function () {
          this.cropper
            .getCroppedCanvas({
              width: 472,
              height: 472,
              imageSmoothingQuality: "high",
            })
            .toBlob((blob) => {
              const { tile, tiles, setTiles } = self.props;
              const newTile = {
                ...tile,
                naturalHeight: this.cropper.initialImageData.naturalHeight,
                naturalWidth: this.cropper.initialImageData.naturalWidth,
                aspectRatio: this.cropper.initialImageData.aspectRatio,
                croppedImage: blob,
              };
              const newTiles = tiles.map((x) => {
                if (x.position == tile.position) {
                  x = newTile;
                }
                return x;
              });
              setTiles(newTiles);
              this.cropper && this.cropper.destroy();
            });
        }, 100),
      })
    );
  }

  componentDidMount() {
    this.cropperInstance();
  }
  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.tile) !== JSON.stringify(this.props.tile)) {
      const cropper = this.cropperInstance();
    }
  }
  render() {
    const { tile } = this.props;
    const { openDialog, openDialogConfirmEdit } = this.state;
    let frameSVG = frameNone;
    let frameStyle = "frameless";
    if (
      this.props.selectedFrame == "ever" ||
      this.props.selectedFrame == "clean"
    ) {
      if (this.props.selectedFrame == "ever") {
        frameStyle = "matting";
      } else {
        frameStyle = "";
      }
      frameSVG = frameWhite;
    } else if (
      this.props.selectedFrame == "classic" ||
      this.props.selectedFrame == "bold"
    ) {
      if (this.props.selectedFrame == "classic") {
        frameStyle = "matting";
      } else {
        frameStyle = "";
      }
      frameSVG = frameBlack;
    }

    const objectURL =
      tile.croppedImage && URL.createObjectURL(tile.croppedImage);

    return (
      <div
        className={`tile image-${tile.position}`}
        key={`image-${tile.position}`}
      >
        <div
          className="tile-base"
          onClick={() => this.handleOpenDialog()}
        ></div>
        <div className="action-group">
          <div
            title="Remove Tile"
            className="remove"
            onClick={() => this.handleRemoveTile(tile.position)}
          >
            <img className="icon" src={removeTile} />
          </div>
          <div
            title="Adjust Crop"
            className="crop"
            onClick={() => this.handleOpenDialog()}
          >
            <img className="icon" src={cropTile} />
          </div>
        </div>
        <div
          className={`preview ${frameStyle}`}
          onClick={() => this.handleOpenDialog()}
        >
          <div className="preview-area">
            {objectURL ? (
              <img src={objectURL} />
            ) : (
              <div className="loadingio-spinner-rolling-c3fijqr0zkh">
                <div className="ldio-6ydtb2xauzl">
                  <div></div>
                </div>
              </div>
            )}
          </div>
          <div className={"orginalImage"} style={{ display: "none" }}>
            <img
              ref={this.cropperRef}
              id="cropper"
              src={tile.localOriginalUrl}
              alt=""
            />
          </div>
        </div>
        <div
          className="TileFrame"
          onClick={() => this.handleOpenDialogConfirmEdit(true)}
        >
          <img className={`frame ${this.props.selectedFrame}`} src={frameSVG} />
        </div>
        {openDialog ? (
          <CropperDialog
            open={true}
            onClose={this.handleCloseDialog}
            onCrop={this.handleManualCrop}
            frame={{ frameSVG, frameStyle }}
            {...this.props}
          />
        ) : (
          <div />
        )}
        <Drawer
          anchor={"bottom"}
          open={openDialogConfirmEdit && window.innerWidth <= 960}
          onClose={() => this.handleOpenDialogConfirmEdit(false)}
        >
          <div className="dialogConfirmEdit">
            <div
              title="Adjust Crop"
              className={"dialog-button with-icon"}
              onClick={() => this.handleOpenDialog()}
            >
              <img className="icon" src={cropTile} />

              <p>{this.props.t("cropperDialog.Adjust Crop")}</p>
            </div>
            <div
              title="Remove Tile"
              className={"dialog-button with-icon"}
              onClick={() => this.handleRemoveTile(tile.position)}
            >
              <img className="icon" src={removeTile} />
              <p>{this.props.t("cropperDialog.Remove Tile")}</p>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default Review;
