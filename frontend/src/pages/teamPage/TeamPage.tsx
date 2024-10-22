import { Divider } from "@mui/material";
import PageLayout from "../../templates/pageLayout/PageLayout";
import styles from "./teamPage.module.css";
import { t } from "i18next";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useState } from "react";

const TeamPage = () => {
  const [newMember, setNewMember] = useState('');
  const members = [
    {
      name: "Иван",
      surname: "Иванов",
      role: "разработчик",
      isAdmin: true,
    },
    {
      name: "Петр",
      surname: "Петров",
      role: "менеджер",
      isAdmin: true,
    },
  ];

  const invitations = [
    {
      name: "Иван",
      surname: "Иванов",
      role: "разработчик",
    },
    {
      name: "Петр",
      surname: "Петров",
      role: "менеджер",
    },
  ];

  return (
    <PageLayout projectMenu={true} title="Проект 1">
      <div className={styles.teamPage}>
        <div className={styles.members}>
          {members.map((member, index) => (
            <div className={styles.memberWrapper}>
              <div className={styles.member}>
                <div className={styles.memberInfo}>
                  <div className={styles.memberAvatar}>
                    <AccountCircleOutlinedIcon fontSize="large"/>
                  </div>
                  <div className={styles.memberTextInfo}>
                    <span className={styles.memberName}>
                      {`${member.name} ${member.surname} (${t(member.isAdmin ? 'teamPage.admin' : 'teamPage.member')})`}
                    </span>
                    <span className={styles.memberRole}>{member.role}</span>
                  </div>
                </div>
                <div className={styles.actions}>
                  <button className='primary-button'>{t('teamPage.change')}</button>
                  <button className='primary-button'>{t('teamPage.delete')}</button>
                </div>
              </div>
              { index !== members.length - 1 && <hr className={styles.divider}/> }
            </div>
          ))}
        </div>
        <div className={styles.members}>
          {invitations.map((invitation) => (
            <div className={styles.memberWrapper}>
              <div className={styles.member}>
                <div className={styles.memberInfo}>
                  <div className={styles.memberAvatar}>
                    <AccountCircleOutlinedIcon fontSize="large"/>
                  </div>
                  <div className={styles.memberTextInfo}>
                    <span className={styles.memberName}>{`${invitation.name} ${invitation.surname}`}</span>
                    <span className={styles.memberRole}>{invitation.role}</span>
                  </div>
                </div>
                <div className={styles.actions}>
                  <button className='primary-button'>{t('teamPage.revoke')}</button>
                </div>
              </div>
              <hr className={styles.divider}/>
            </div>
          ))}
          <div className={styles.addInvitation}>
            <input className={styles.input} type="text" value={newMember} onChange={(e) => setNewMember(e.target.value)}/>
            <button className="primary-button" onClick={() => {}}>{t("teamPage.invite")}</button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default TeamPage;
