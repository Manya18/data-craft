import { Outlet } from "react-router-dom";
import PageLayout from "../../templates/pageLayout/PageLayout"
import DataPresentationTabs from "../../components/dataPresentationTabs/DataPresentationTabs";
import DataControlRow from "../../components/dataControlRow/DataControlRow";

const TimelinePage = () => {
    return(
        <PageLayout projectMenu={true} title="Project 1">
            <DataPresentationTabs></DataPresentationTabs>
            <DataControlRow></DataControlRow>
            <Outlet></Outlet>
        </PageLayout>
    )
}
export default TimelinePage;