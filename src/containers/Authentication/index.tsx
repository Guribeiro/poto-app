import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import ConfirmCredentials from '../../modules/authentication/screens/ConfirmCredentials';
import { ApplicationState } from '../../shared/store';
import * as AuthenticationActions from '../../shared/store/ducks/authentication/actions';

const mapStateToProps = ({authentication}:ApplicationState) => ({
  authentication,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(AuthenticationActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmCredentials);
