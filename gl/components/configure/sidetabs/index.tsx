import Style from './sidetabs.module.scss'
import { DOMIDMAPPINGS } from '../../../constants';

const SideTab = ({children}) => {
    return (
        <div className={Style.sidePanel} id={DOMIDMAPPINGS.VARIANT_SIDE_PANEL}>
            {children}
        </div>
    )
}

export default SideTab;
