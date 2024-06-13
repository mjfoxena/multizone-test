import Style from './sidepanel.module.scss'
import { DOMIDMAPPINGS } from '../../../constants';

const SidePanel = ({isLimited,children}) => {
    return (
        <div className={isLimited ? Style.sidePanelLimited : Style.sidePanel} id={DOMIDMAPPINGS.VARIANT_SIDE_PANEL}>
            {children}
        </div>
    )
}


export default SidePanel;
