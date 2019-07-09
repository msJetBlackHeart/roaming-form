import React, { Component } from 'react'
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Fab,
  Paper,
  Typography,
  Avatar,
  Chip,
  Modal,
  Card,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  withStyles,
} from "@material-ui/core";
import { Help, AttachFile, ExpandMore } from "@material-ui/icons";

class Summary extends Component {

  state = {
    openModalFile: false,
  }

  handleCloseModal = () => {
    const { openModalFile } = this.state
    this.setState({ openModalFile: false })
  }

  handleOpenModal = () => {
    const { openModalFile } = this.state
    this.setState({ openModalFile: true })
  }

  handleDelete = () => {
    console.log('1')
  }

  render() {
    const {
      classes,
      values,
      senderList,
      receiverList,
      handleDeleteSenderList,
      handleDeleteReceiverList,
    } = this.props
    const { openModalFile } = this.state
    let colFiles = 0
    colFiles = senderList ? colFiles + 1 : colFiles
    colFiles = receiverList ? colFiles + 1 : colFiles

    return (
      <>
        <div className={classes.cardRoot}>

          {!senderList &&
            <div className={classes.kontragentExplansion}>

              <Typography variant="h6" id="modal-title">
                Данные Ваших клиентов
              </Typography>

              {values.sender.map((item, index) => {
                let obj = {} // объект
                // заполним из Values
                obj.kpp = item.kpp
                obj.inn = obj.kpp ? `${item.inn} / ${item.kpp}` : item.inn
                obj.name = item.name
                if (item.inn && item.inn.length === 12)
                  obj.name = item.patronymic ? `ИП ${item.lastname} ${item.firstname} ${item.patronymic}` :
                    `ИП ${item.lastname} ${item.firstname}`
                obj.id = item.id
                obj.number = item.number
                // проверим на корректность ФИО для ИП
                let checkName = false
                if (obj.name)
                  checkName = obj.name.indexOf(undefined) === -1 ? true : false

                return (
                  <>
                    {checkName &&
                      <ExpansionPanel>
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMore />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography> {obj.name} </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>

                          <Table>
                            <TableBody>

                              {obj.inn && <TableRow>
                                <TableCell align='left'>ИНН</TableCell>
                                <TableCell align='right'>{obj.inn}</TableCell>
                              </TableRow>}
                              {obj.id && <TableRow>
                                <TableCell align='left'>Идентификатор</TableCell>
                                <TableCell align='right'>{obj.id}</TableCell>
                              </TableRow>}
                              {obj.number && <TableRow>
                                <TableCell align='left'>Номер заявки</TableCell>
                                <TableCell align='right'>{obj.number}</TableCell>
                              </TableRow>}


                            </TableBody>
                          </Table>

                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    }
                  </>
                )

              })}
            </div>
          }

          {(senderList || receiverList) &&
            <div className={classes.kontragentExplansion}>

              <Typography variant="h6" id="modal-title">
                Загруженные файлы
              </Typography>

              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>Добавлено файлов: {colFiles}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>

                  {senderList &&
                    <Chip
                      avatar={
                        <Avatar>
                          <AttachFile />
                        </Avatar>
                      }
                      label={
                        <p className={classes.labelChip}>
                          {senderList.name}
                        </p>
                      }
                      onDelete={handleDeleteSenderList}
                      className={classes.chipFiles}
                      variant='outlined'
                      color='primary'
                    />
                  }
                  {receiverList &&
                    <Chip
                      avatar={
                        <Avatar>
                          <AttachFile />
                        </Avatar>
                      }
                      label={
                        <p className={classes.labelChip}>
                          {receiverList.name}
                        </p>
                      }
                      onDelete={handleDeleteReceiverList}
                      className={classes.chipFiles}
                      variant='outlined'
                      color='primary'
                    />
                  }

                </ExpansionPanelDetails>
              </ExpansionPanel>

            </div>
          }

          {!receiverList && <div className={classes.kontragentExplansion}>

              <Typography variant="h6" id="modal-title">
                Данные контрагентов Ваших клиентов
              </Typography>

              {values.receiver.map((item, index) => {
                let obj = {} // объект
                // заполним из Values
                obj.kpp = item.kpp
                obj.inn = obj.kpp ? `${item.inn} / ${item.kpp}` : item.inn
                obj.name = item.name
                if (item.inn && item.inn.length === 12)
                  obj.name = item.patronymic ? `ИП ${item.lastname} ${item.firstname} ${item.patronymic}` :
                    `ИП ${item.lastname} ${item.firstname}`
                obj.id = item.id
                // проверим на корректность ФИО для ИП
                let checkName = false
                if (obj.name)
                  checkName = obj.name.indexOf(undefined) === -1 ? true : false

                return (
                  <>
                    {checkName &&
                      <ExpansionPanel>
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMore />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography> {obj.name} </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>

                          <Table>
                            <TableBody>

                              {obj.inn && <TableRow>
                                <TableCell align='left'>ИНН</TableCell>
                                <TableCell align='right'>{obj.inn}</TableCell>
                              </TableRow>}
                              {obj.id && <TableRow>
                                <TableCell align='left'>Идентификатор</TableCell>
                                <TableCell align='right'>{obj.id}</TableCell>
                              </TableRow>}


                            </TableBody>
                          </Table>

                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    }
                  </>
                )

              })}
            </div>
          }
        </div>
      </>
    )
  }
}

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  cell: {
    maxWidth: '50%'
  },
  paperFiles: {
    width: '100%',
    display: "flex",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 15,
    padding: 10
  },
  labelChip: {
    width: 180,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  kontragentExplansion: {
    width: '100%',
    marginTop: 20
  },
  cardRoot: {
    width: 620,
    padding: 10
  },
  chipFiles: {
    marginRight: 10
  }
});

export default withStyles(styles)(Summary);