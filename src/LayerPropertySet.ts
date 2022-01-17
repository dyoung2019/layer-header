import { LayerPropertyFlags } from "./LayerPropertyFlags";

const ParentLayer = 
// Transform: properties
  LayerPropertyFlags.Anchor
  | LayerPropertyFlags.Position
  | LayerPropertyFlags.Scale
  | LayerPropertyFlags.Rotation
  | LayerPropertyFlags.Opacity
  // positionX: number
  // positionY: number
  // positionZ: number
  // skew
  // skewAxis
  // rotationX: number
  // rotationY: number
  // rorationZ: number
  // AutoOrient: boolean
  // BlendMode: BlendMode
  // is3D: boolean
  // index?: number
  // ClassNames: string[]
  // layer HTML id: string
  // Id: string
  // inPoint: number
  // outpoint: number
  // startTime: number
  // name: string
  | LayerPropertyFlags.Masks
  // inverted: boolean
  // maskName
  | LayerPropertyFlags.MaskPath
  | LayerPropertyFlags.MaskOpacity
  // maskMode
  | LayerPropertyFlags.Effects
  // time strecth: number
  // parent: layer id
  // Height: number
  // type
  // width: number
  // colors: string[]
  // totalFrames: number
  ;

const ImageProperties = ParentLayer
  // | refID: string
  ;

const SolidProperties = ParentLayer
  // Orentation 
  // solidColor
  // solidHeight
  // solidWidth

const ShapeProperties = ParentLayer 
  // Shapes
  // Skew
  // SkewAxis
  // | Items: []
    // shape
      // match name
      // name
      // direction
      // type
      // vertices
    // rect
      // match name
      // name
      // direction
      // type
      // rectPosition
      // rectSize
      // rectRoundedCorners
    // ellipse
      // match name
      // name
      // direction
      // ellipsePosition
      // ellipseSize
    // fill
      // match name
      // name
      // fillType
      // fillOpacity
      // fillColor
    // gradient Fill
      // match name
      // name
      // startPoint
      // endPoint
      // gType
      // highlightLength
      // highlightAngle
      // gFillColors
    // gradient stroke
      // match name
      // name  
      // opacity
      // startPoint
      // endPoint
      // type
      // highlightLength
      // highlightAngle
      // gradientColors
      // strokeWidth
      // lineCap
      // lineJoin
      // miterLimit
    // stroke
      // match name
      // name
      // lineCap [butt, round, square]
      // lineJoin [miter, round, bevel]
      // miterLimit
      // opacity
      // width
      // color
    // merge
      // match name
      // name
      // mergeMode    
    // trim
      // matchName
      // name
      // trimStart
      // trimEnd
      // trimOffset
    // group
      // matchName
      // name
      // np numberOfProperties
      // items
    // round
      // matchName
      // name
      // cornerRadius
    // repeater
      // matchName
      // name
      // copies
      // offset
      // composite [Above, Below]
      // transform
    // star
      // matchName
      // name
      // direction
      // position
      // innerRadius
      // innerRoundness
      // outerRadius
      // outerRoundness
      // rotation
      // points
      // starType
  ;

const PreCompProperties = ParentLayer
  // refID
  | LayerPropertyFlags.TimeRemap
  ;

const GroupProperties = ParentLayer
  // index?: number
  // Orentation 

const TextLayer = ParentLayer
  // TextData: any
    // animators
      // position
      // anchor
      // scale
      // skew
      // skew axis
      // rotation
      // opacity
      // stroke width
      // stroke color 
      // fileColor
      // fillHue
      // fillSaturation
      // fillBrightness
      // tracking
      // rangeSelection 
        // type
        // maxAmount
        // minEase
        // maxEase
        // randomize
        // shape
        // basedon
        // rangeunits
        // start
        // end
        // offset
      // moreOptions
        // anchorPointGrouping
        // groupAlignment
      // textPath
      // document
        // keyframes
          // time
          // fontcolor
          // justification
          // lineHeight
          // size
          // text
          // tracking

  //
  ;

const NullProperties = ParentLayer

  ;

// const parentEffect
    // effectIndex
    // matchName 
    // name
    // type
    // value

// effect
  // angle 
  // checkbox
  // color
  // customValue?
  // dropDown
  // fill
    // effects
      // point
      // dropDown
      // color
      // dropDown
      // slider
      // slider
      // slider
  // group
    // enabled
  // index ?
  // layer
  // noValue?
  // point
  // proLevels
    // dropDown
    // noValue
    // noValue
    // slider
    // slider
    // slider
    // slider
    // slider
    // noValue
    // slider
    // slider
    // slider
    // slider
    // slider
    // noValue
    // slider
    // slider
    // slider
    // slider
    // slider
    // noValue
    // slider
    // slider
    // slider
    // slider
    // slider
    // noValue
    // slider
    // slider
    // slider
    // slider
    // slider
  // slider
  // stroke
    // color
    // checkbox
    // color
    // slider
    // slider
    // slider
    // slider
    // slider
    // dropDown
    // dropDown
  // tint
    // color
    // color
    // slider
  // tritone
    // color
    // color
    // color
    // slider
  




  
