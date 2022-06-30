const CustomSkeleton = ({type}) => {
    switch(type) {
        case "hit":
            return (
                <div className="skeleton__hit">
                    <div className="skeleton__hit-top"></div>
                    <div className="skeleton__hit-bottom"></div>
                </div>
            )
        case "facet":
            return (
                <div className="skeleton__facet">
                    <div className="skeleton__facet-title"></div>
                    <div className="skeleton__facet-text"></div>
                    <div className="skeleton__facet-text"></div>
                    <div className="skeleton__facet-text"></div>
                    <div className="skeleton__facet-text"></div>
                </div>            
            )

    
    }

}

export default CustomSkeleton;